const service = require('../services/blog-service')
const ApiError = require('../error/api-error')

class BlogController{
    async getAll(req, res){
        const {gameId} = req.query;
        console.log(req.params)
        return res.json(await service.getAll(gameId))
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
        const {gameId, typeBlogId} = req.body;
        if(gameId || typeBlogId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.create(gameId, typeBlogId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {gameId, typeBlogId} = req.body
        const {id} = req.params
        if(!gameId || typeBlogId){
            return next(ApiError.badBody())
        }

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

module.exports = new BlogController()