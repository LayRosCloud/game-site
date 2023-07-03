const {CommentEntity, BlogEntity} = require('../core/models')
class CommentsService{
    async getAll(){
        return await CommentEntity.findAll();
    }
    async get(id){
        const response = await CommentEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(date, content, gameId, userId){
        return await CommentEntity.create({date, content, gameId,userId});
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