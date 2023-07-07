const service = require('../services/game-genre-service')
const ApiError = require('../error/api-error')
class GameGenreController{
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
        const {gameId, genreId} = req.body
        if(!gameId || genreId){
            return next(ApiError.badBody())
        }
        try{
            return res.json(await service.create(gameId, genreId))
        }
        catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next){
        const {gameId, genreId} = req.body
        const {id} = req.params

        if(!gameId || genreId){
            return next(ApiError.badBody())
        }

        try{
            return res.json(await service.update(id, gameId, genreId))
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

module.exports = new GameGenreController()