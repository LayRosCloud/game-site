const {TokenEntity} = require('../core/models')
const jwt = require('jsonwebtoken')
class TokenService{
    async generateTokens(user){
        const accessToken = jwt.sign({id: user.id,
            login: user.login,
            email: user.email,
            isBanned: user.isBanned,
            isActivated: user.isActivated, roleId: user.roleId},
            process.env.ACCESS_KEY, {expiresIn: '15s'});
        const refreshToken = jwt.sign({id: user.id,
            login: user.login,
            email: user.email,
            isBanned: user.isBanned,
            isActivated: user.isActivated,
            roleId: user.roleId}, process.env.REFRESH_KEY, {expiresIn: '30s'});
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