const {ContentGameEntity, BlogEntity, TypeContentEntity} = require('../core/models')
class ContentGameService{
    async getAll(blogId, typeContentId){
        let results = []
        if(!blogId && !typeContentId){
            results = await ContentGameEntity.findAll({include: [BlogEntity, TypeContentEntity]})
        }
        else if(blogId && !typeContentId){
            results = await ContentGameEntity.findAll({where: {blogId},include: [BlogEntity, TypeContentEntity]})
        }
        else if(!blogId && typeContentId){
            results = await ContentGameEntity.findAll({where: {typeContentId}, include: [BlogEntity, TypeContentEntity]})
        }
        else if(blogId && typeContentId){
            results = await ContentGameEntity.findAll({where: {blogId, typeContentId}, include: [BlogEntity, TypeContentEntity]})
        }
        return results;
    }
    async get(id){
        const response = await ContentGameEntity.findOne({where: {id}, include: [BlogEntity, TypeContentEntity]})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(content, blogId, typeContentId){
        return await ContentGameEntity.create({content, blogId, typeContentId}, {include: [BlogEntity, TypeContentEntity]});
    }

    async update(id, content, blogId, typeContentId){
        await this.get(id)
        await ContentGameEntity.update({content, blogId, typeContentId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await ContentGameEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new ContentGameService()