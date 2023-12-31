const service = require('../services/comments-service')
const ApiError = require('../error/api-error')
class CommentsController{
    async getAll(req, res){
        const response = await service.getAll();
        res.setHeader('x-total-count', response.count)
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        return res.json(response.rows)
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
        const {content, gameId, userId} = req.body
        try{
            return res.json(await service.create(content,gameId,userId))
        }
        catch (e){
            return next(ApiError.badBody(e.message))
        }
    }

    async update(req, res, next){
        const {content, isModerated, gameId, userId} = req.body

        const {id} = req.params

        try{
            return res.json(await service.update(id, content, isModerated, gameId, userId))
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

module.exports = new CommentsController()