const ApiError = require('../error/api-error')
const tokenService = require('../services/token-service')
module.exports = function (req, res, next){
    try{
        const auth = req.headers.authorization;
        if(!auth){
            throw new Error('Ошибка! Пользователь не авторизован')
        }

        const accessToken = auth.split(' ')[1]
        if(!accessToken){
            throw new Error('Ошибка! Пользователь не авторизован')
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            throw new Error('Ошибка! Пользователь не авторизован')
        }
        req.user = userData;
        next();
    } catch (e){
        return next(ApiError.auth(e.message))
    }
}