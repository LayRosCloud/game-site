const {ContentGameEntity} = require('../core/models')
class ContentGameService{
    async getAll(){
        return await ContentGameEntity.findAll();
    }
    async get(id){
        const response = await ContentGameEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(content, order, blogId, typeContentId){
        return await ContentGameEntity.create({content, order, blogId, typeContentId});
    }

    async update(id, content, order, blogId, typeContentId){
        await this.get(id)
        await ContentGameEntity.update({content, order, blogId, typeContentId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await ContentGameEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new ContentGameService()