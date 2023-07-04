const {CommentEntity, ReviewEntity,GameEntity,UserEntity} = require('../core/models')
const CommentDto = require('../core/dto/CommentDto')
class CommentsService{
    async getAll(){
        const results = await CommentEntity.findAll({include: [GameEntity, UserEntity]});
        const response = []
        results.forEach(result => {
            response.push(new CommentDto(result))
        })
        return response;
    }
    async get(id){
        const response = await CommentEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(date, content, gameId, userId){
        return await CommentEntity.create({date, content, gameId, userId});
    }

    async makeReview(title, rating, commentId){
        await this.get(commentId);
        return await ReviewEntity.create({title, rating, commentId});
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