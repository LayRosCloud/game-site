const service = require('../services/user-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
const bcrypt = require("bcrypt");

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
        const {login, email, password, identityItem} = req.body
        if(!login || !email || !password || !identityItem){
            return next(ApiError.badBody());
        }
        let avatarImage = null;
        if(req.files){
            const {image} = req.files
            avatarImage = uuid.v4 + '.jpg'
            await image.mv(path.resolve(__dirname, '..', 'static', avatarImage))

        }
        const hashPassword = await bcrypt.hash(password, 3)
        try{
            return res.json(await service.create(login, email, hashPassword, avatarImage, 1, identityItem))
        }
        catch (e){
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