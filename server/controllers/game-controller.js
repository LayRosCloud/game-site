const service = require('../services/game-service')
const ApiError = require('../error/api-error')
const uuid = require('uuid')
const path = require('path')
class GameController{
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
        const {title, description, developer, publisher, typeReleaseId} = req.body
        const { sourceFile } = req.files
        if(!title || !description|| !developer|| !publisher|| !typeReleaseId){
            return next(ApiError.badBody())
        }
        const urlDownload = uuid.v4() + '.zip';
        await sourceFile.mv(path.resolve(__dirname, '..', 'static', urlDownload))

        try{
            return res.json(await service.create(title, description, developer, publisher, urlDownload, typeReleaseId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        let {title, description, developer, urlDownload, publisher, typeReleaseId} = req.body
        if(!title || !description|| !developer|| !urlDownload || !publisher|| !typeReleaseId){
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