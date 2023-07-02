const {TypeReleaseEntity} = require('../core/models')
class TypeReleaseService{
    async getAll(){
        return await TypeReleaseEntity.findAll();
    }
    async get(id){
        const response = await TypeReleaseEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await TypeReleaseEntity.create({name});
    }

    async update(id, name){
        let response = await this.get(id)
        await TypeReleaseEntity.update({name}, {where: {id}})
        response = await this.get(id)
        return response;
    }

    async delete(id){
        await this.get(id)
        await TypeReleaseEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new TypeReleaseService()