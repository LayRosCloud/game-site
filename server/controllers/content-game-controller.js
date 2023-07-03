const service = require('../services/game-content-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
class GameContentController{
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
        let {content, order, blogId} = req.body
        const {img} = req.files;
        let typeContentId = 1;
        if(img){
            content = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', content));
            typeContentId = 2;
        }
        try{
            return res.json(await service.create(content, order, blogId, typeContentId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        let {content, order, blogId} = req.body
        const {image} = req.files;
        let typeContentId;
        if(image) {
            typeContentId = 3;
            content = uuid.v4();
        }
        else {
            typeContentId = 1;
        }

        const {id} = req.params
        try{
            return res.json(await service.update(id, content, order, blogId, typeContentId))
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

module.exports = new GameContentController()