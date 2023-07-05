const tokenService = require("../services/token-service");
const ApiError = require("../error/api-error");
const roleService = require('../services/role-service')

module.exports = function (roles){
    return  function (req, res, next){
        try{
            const auth = req.headers.authorization;
            if(!auth){
                throw new Error('Ошибка! Пользователь не авторизован')
            }

            const accessToken = auth.split(' ')[1]
            if(!accessToken){
                throw new Error('Ошибка! Пользователь не авторизован')
            }
            const role = tokenService.validateAccessToken(accessToken).roleId
            let hasRole = roles.includes(role);

            if(hasRole === false){
                throw new Error('Недостаточно прав')
            }
            next();
        } catch (e){
            return next(ApiError.forbidden(e.message))
        }
    }
}