const {CommentEntity, ReviewEntity,GameEntity,UserEntity} = require('../core/models')
const CommentDto = require('../core/dto/CommentDto')
class CommentsService{
    async getAll(gameId, limit, page){
        limit = limit || 9
        page = page || 1

        let offset = page * limit - limit
        let results = []
        if(gameId){
            results = await CommentEntity.findAndCountAll({include: [GameEntity, UserEntity], where: {gameId}, limit, offset});
        }
        else{
            results = await CommentEntity.findAndCountAll({include: [GameEntity, UserEntity], limit, offset});
        }
        const response = []
        results.rows.forEach(result => {
            response.push(new CommentDto(result))
        })

        return results
    }
    async get(id){
        const response = await CommentEntity.findOne({where: {id},include: [GameEntity, UserEntity]})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(content, gameId, userId){
        const response = await CommentEntity.create({content, gameId, userId}, {include: [GameEntity, UserEntity]})
        return new CommentDto(response);
    }

    async update(id, content, isModerated, gameId, userId){
        await this.get(id)
        await CommentEntity.update({content, isModerated, gameId, userId}, {where: {id}})
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await CommentEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new CommentsService()