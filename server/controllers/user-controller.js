const service = require('../services/user-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
const {validationResult} = require('express-validator')
const saveImage = require("../scripts/save-image");

const refreshTokenCookie = 'refreshToken'
const formatImage = '.jpg'
const maxAgeCookie = 30 * 24 * 60 * 60 * 1000;
const httpOnlyCookie = true
const folderAvatars = 'avatars'
const folderAllFiles = 'static'
const backFolder = '..'

class UserController{
    async getAll(req, res){
        return res.json(await service.getAll())
    }

    async get(req, res, next){
        const {link} = req.params
        try{
            return res.json(await service.get(link))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }
    
    async create(req, res, next){
        const {login, email, password} = req.body

        if(!login || !email || !password){
            return next(ApiError.badBody());
        }

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return next(new ApiError(400, "Ошибка! Почта или пароль имели неверный формат"))
        }

        try{
            let avatarImage = null;

            if(req.files){
                const { image } = req.files
                avatarImage = await saveImage(image, folderAvatars)
            }

            const userData = await service.create(login, email, password, avatarImage, 1);

            res.cookie(refreshTokenCookie, userData.refreshToken, {maxAge: maxAgeCookie, httpOnly: httpOnlyCookie})

            return res.json(userData)
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next){
        const {email, password} = req.body;
        if(!email || !password){
            return next(ApiError.badBody())
        }
        try{
            const response = await service.login(email, password)

            res.cookie(refreshTokenCookie, response.refreshToken, {maxAge: maxAgeCookie, httpOnly: httpOnlyCookie})

            return res.json(response);
        } catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const userData = await service.refresh(refreshToken)

            res.cookie(refreshTokenCookie, userData.refreshToken, {maxAge: maxAgeCookie, httpOnly: httpOnlyCookie})

            return res.json(userData)

        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await service.logout(refreshToken);
            res.clearCookie(refreshTokenCookie)
            return res.json(token)
        }catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async activate(req,res,next){
        const {link} = req.params;
        try{
            await service.activate(link)
            return res.redirect(process.env.CLIENT_URL)
        }catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        let {login, status, email, password, avatarImage, isBanned, roleId} = req.body

        const {id} = req.params
        const {refreshToken} = req.cookies;

        if(!login || !email || !password || !isBanned || !roleId){
            return next(ApiError.badBody())
        }

        try{
            const {image} = req.files;

            if(image){
                avatarImage = uuid.v4 + formatImage
                await image.mv(path.resolve(__dirname, backFolder, folderAllFiles, avatarImage))
            }

            return res.json(await service.update(id, login, status, email, password, avatarImage, isBanned, roleId,refreshToken))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next){
        const {id} = req.params
        const {refreshToken} = req.cookies;
        try{
            return res.json(await service.delete(id, refreshToken))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

}
module.exports = new UserController()