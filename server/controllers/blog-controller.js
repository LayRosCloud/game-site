const service = require('../services/blog-service')
const ApiError = require('../error/api-error')
const path = require("path");
const uuid = require('uuid')
const saveImage = require('../scripts/save-image')

class BlogController{
    async getAll(req, res){
        const {gameId, typeBlogId, limit, page} = req.query;
        const response = await service.getAll(gameId, typeBlogId, Number(limit), Number(page));
        res.setHeader('x-total-count', response.count)
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
        const {title, description, gameId, typeBlogId} = req.body;
        if(!title || !description || !gameId || !typeBlogId){
            return next(ApiError.badBody())
        }
        try{
            const {previewImg} = req.files;

            const preview = await saveImage(previewImg, 'previews')

            return res.json(await service.create(title, description, gameId, typeBlogId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {title, description, preview, gameId, typeBlogId} = req.body
        const {id} = req.params
        if(!gameId || typeBlogId){
            return next(ApiError.badBody())
        }

        try{
            return res.json(await service.update(id,title,description,preview, gameId, typeBlogId))
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