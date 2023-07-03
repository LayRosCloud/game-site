const {BlogEntity} = require('../core/models')
class BlogService{
    async getAll(){
        return await BlogEntity.findAll();
    }
    async get(id){
        const response = await BlogEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(gameId, typeBlogId){
        return await BlogEntity.create({gameId, typeBlogId});
    }

    async update(id, gameId, typeBlogId){
        await this.get(id)
        await BlogEntity.update({gameId, typeBlogId}, {where: {id}})
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await BlogEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new BlogService()