const tokenService = require("../services/token-service");
const ApiError = require("../error/api-error");
const roleService = require('../services/role-service')

module.exports = function (roles){
    return async function (req, res, next){
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
            const fullRole = await roleService.get(role);
            let hasRole = roles.includes(fullRole.name);

            if(hasRole === false){
                throw new Error('Недостаточно прав')
            }
            next();
        } catch (e){
            return next(ApiError.forbidden(e.message))
        }
    }
}