const service = require('../services/preview-service')
const ApiError = require('../error/api-error')
class PreviewController{
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
        const {url, gameId, typeContentId} = req.body
        if(!url || gameId || typeContentId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.create(url, gameId, typeContentId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {url, gameId, typeContentId} = req.body
        const {id} = req.params
        if(!url || gameId || typeContentId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.update(id, url, gameId, typeContentId))
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

module.exports = new PreviewController()