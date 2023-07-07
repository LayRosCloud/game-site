const {GameGenreEntity, GameEntity, GenreEntity} = require('../core/models')
class GameGenreService{
    async getAll(){
        return await GameGenreEntity.findAll({include: [GameEntity, GenreEntity]});
    }
    async get(id){
        const response = await GameGenreEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(gameId, genreId){
        return await GameGenreEntity.create({gameId, genreId});
    }

    async update(id, gameId, genreId){
        await this.get(id)
        await GameGenreEntity.update({gameId, genreId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await GameGenreEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new GameGenreService()