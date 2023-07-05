const service = require('../services/user-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator')

class UserController{
    async getAll(req, res){
        return res.json(await service.getAll())
    }

    async get(req, res, next){
        const {id} = req.params
        try{
            return res.json(await service.get(id))
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
                avatarImage = uuid.v4 + '.jpg'
                await image.mv(path.resolve(__dirname, '..', 'static', avatarImage))

            }

            const userData = await service.create(login, email, password, avatarImage, 1);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
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
            res.cookie('refreshToken', response.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(response);
        } catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async refresh(req, res, next){
        try{

            const {refreshToken} = req.cookies;
            const userData = await service.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
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
            res.clearCookie('refreshToken')
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
        let {login, email, password, avatarImage, isBanned, roleId} = req.body
        const {id} = req.params
        if(!login || !email || !password || !isBanned || !roleId){
            return next(ApiError.badBody())
        }
        const {image} = req.files;
        if(image){
            avatarImage = uuid.v4 + '.jpg'
            await image.mv(path.resolve(__dirname, '..', 'static', avatarImage))

        }
        const hashPassword = bcrypt.hash(password, 3)

        try{
            return res.json(await service.update(id, login, email, hashPassword, avatarImage, isBanned, roleId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next){
        const {id} = req.params
        try{
            return res.json(await service.delete(id))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

}
module.exports = new UserController()