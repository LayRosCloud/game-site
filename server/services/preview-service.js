const {PreviewEntity} = require('../core/models')
class PreviewService{
    async getAll(){
        return await PreviewEntity.findAll();
    }
    async get(id){
        const response = await PreviewEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(url, gameId, typeContentId){
        return await PreviewEntity.create({url, gameId, typeContentId});
    }

    async update(id, url, gameId, typeContentId){
        await this.get(id)
        await PreviewEntity.update({url, gameId, typeContentId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await PreviewEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new PreviewService()