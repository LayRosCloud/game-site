const service = require('../services/comments-service')
const ApiError = require('../error/api-error')
class CommentsController{
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
        const {content, gameId, userId} = req.body
        try{
            return res.json(await service.create(content,gameId,userId))
        }
        catch (e){
            return next(ApiError.badBody(e.message))
        }
    }

    async makeReview(req, res, next){
        const {title, rating, commentId} = req.body;

        if(!title || !rating || !commentId){
            return next(ApiError.badBody())
        }

        try{
            const response = await service.makeReview(title, rating, commentId);
        }catch (e){
            return next(ApiError.badRequest(e))
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