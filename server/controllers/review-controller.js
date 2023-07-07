const service = require('../services/review-service')
const ApiError = require('../error/api-error')
class ReviewController{
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
        const {title, rating, commentId} = req.body
        try{
            return res.json(await service.create(title, rating, commentId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {gameId, typeBlogId} = req.body
        const {id} = req.params
        try{
            return res.json(await service.update(id, gameId, typeBlogId))
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

module.exports = new ReviewController()