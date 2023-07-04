const {TokenEntity} = require('../core/models')
const jwt = require('jsonwebtoken')
class TokenService{
    async generateTokens(user, identityItem){
        const accessToken = jwt.sign({id: user.id,
            login: user.login,
            email: user.email,
            isBanned: user.isBanned,
            isActivated: user.isActivated, roleId: user.roleId}, process.env.ACCESS_KEY);
        const refreshToken = jwt.sign({id: user.id,
            login: user.login,
            email: user.email,
            isBanned: user.isBanned,
            isActivated: user.isActivated,
            roleId: user.roleId}, process.env.URL_USERS_REFRESH);
        await TokenEntity.create({refreshToken, identityItem: identityItem, userId: user.id})
        return {accessToken, refreshToken}
    }
}
module.exports = new TokenService()