const {TokenEntity} = require('../core/models')
const jwt = require('jsonwebtoken')
const UserDto = require("../core/dto/UserDto");
class TokenService{
    async generateTokens(user){
        const dto = new UserDto(user)
        const accessToken = jwt.sign({...dto},
            process.env.ACCESS_KEY, {expiresIn: '30m'});
        const refreshToken = jwt.sign({...dto}, process.env.REFRESH_KEY, {expiresIn: '30d'});
        await this.saveToken(refreshToken, user.id)
        return {accessToken, refreshToken}
    }

    async saveToken(refreshToken, userId){
        const response = await TokenEntity.findOne({where: {userId}})

        if(response){
            await TokenEntity.update({refreshToken}, {where: {id: response.id}})
            return await TokenEntity.findOne({where: {id: response.id}})
        }

        return await TokenEntity.create({refreshToken, userId: userId})
    }

    async removeToken(refreshToken){
        const token = await TokenEntity.destroy({where: {refreshToken}})
        if(token === 0){
            throw new Error('Запись не найдена')
        }
        return {status: 200, message: `Запись удалена!`}
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.ACCESS_KEY);
            return userData;
        }
        catch (e){
            return null;
        }
    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.REFRESH_KEY);
            return userData;
        }
        catch (e){
            return null;
        }
    }

    async findToken(refreshToken){
        const userData = await TokenEntity.findOne({where: {refreshToken}});
        return userData;
    }
}
module.exports = new TokenService()