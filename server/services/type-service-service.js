const {TypeServiceEntity} = require('../core/models')
class TypeServiceService{
    async getAll(){
        return await TypeServiceEntity.findAll();
    }
    async get(id){
        const response = await TypeServiceEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await TypeServiceEntity.create({name});
    }

    async update(id, name){
        await this.get(id)
        await TypeServiceEntity.update({name}, {where: {id}})
        const response = await this.get(id)
        return response;
    }

    async delete(id){
        await this.get(id)
        await TypeServiceEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new TypeServiceService()