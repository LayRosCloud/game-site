const service = require('../services/type-release-service')
const ApiError = require('../error/api-error')
class TypeReleaseController{
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
        const {name} = req.body
        if(!name){
            return next(ApiError.badRequest('Ошибка! Неправильное тело запроса!'))
        }
        try{
            return res.json(await service.create(name))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {name} = req.body
        const {id} = req.params
        if(!name){
            return next(ApiError.badRequest('Ошибка! Неправильное тело запроса!'))
        }
        try{
            return res.json(await service.update(id, name))
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

module.exports = new TypeReleaseController()