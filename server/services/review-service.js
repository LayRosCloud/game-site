const {ReviewEntity} = require('../core/models')
const CommentService = require('./comments-service')
class ReviewService{
    async getAll(){
        return await ReviewEntity.findAll();
    }
    async get(id){
        const response = await ReviewEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }
    async create(title, rating, date, content, gameId, userId){
        const response = await CommentService.create(date, content, gameId, userId)
        return await ReviewEntity.create({title, rating});
    }
    async makeReview(title, rating, commentId){
        return await ReviewEntity.create({title, rating, commentId});
    }

    async update(id, url, gameId, commentId){
        await this.get(id)
        await ReviewEntity.update({title, rating, commentId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await ReviewEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new ReviewService();