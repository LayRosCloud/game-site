const {LinkEntity} = require('../core/models')
class LinkService{
    async getAll(){
        return await LinkEntity.findAll();
    }
    async get(id){
        const response = await LinkEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(url, gameId, typeServiceId){
        return await LinkEntity.create({url, gameId, typeServiceId});
    }

    async update(id, url, gameId, typeServiceId){
        await this.get(id)
        await LinkEntity.update({url, gameId, typeServiceId}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await LinkEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new LinkService()