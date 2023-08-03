const service = require('../services/game-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
class GameController{
    async getAll(req, res){
        const {limit, page} = req.params;
        const response = await service.getAll(limit, page)

        res.set('x-total-count', response.count)
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
        const {title,description, preview, developer, publisher, typeReleaseId} = req.body
        const { sourceFile } = req.files
        if(!developer|| !publisher|| !typeReleaseId){
            return next(ApiError.badBody())
        }

        try{
            const urlDownload = uuid.v4() + '.zip';
            await sourceFile.mv(path.resolve(__dirname, '..', 'static', urlDownload))

            return res.json(await service.create(title, description, preview, developer, publisher, urlDownload, typeReleaseId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        let {title, description, preview, developer, urlDownload, publisher, typeReleaseId} = req.body
        if(!developer|| !urlDownload || !publisher|| !typeReleaseId){
            return next(ApiError.badBody())
        }

        const { sourceFile } = req.files

        if(sourceFile){
            urlDownload = uuid.v4() + '.zip';
            await sourceFile.mv(path.resolve(__dirname, '..', 'static', urlDownload))
        }

        const {id} = req.params

        try{
            return res.json(await service.update(id, title, description, developer, publisher, urlDownload, typeReleaseId))
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

module.exports = new GameController()