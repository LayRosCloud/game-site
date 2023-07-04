const service = require('../services/link-service')
const ApiError = require('../error/api-error')
class LinkController{
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
        const {url, gameId, typeServiceId} = req.body
        if(!url || !gameId || !typeServiceId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.create(url, gameId, typeServiceId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {url, gameId, typeServiceId} = req.body
        const {id} = req.params
        if(!url || !gameId || !typeServiceId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.update(id, url, gameId, typeServiceId))
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

module.exports = new LinkController()