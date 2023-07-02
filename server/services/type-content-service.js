const {TypeContentEntity} = require('../core/models')
class TypeBlogService{
    async getAll(){
        return await TypeContentEntity.findAll();
    }
    async get(id){
        const response = await TypeContentEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await TypeContentEntity.create({name});
    }

    async update(id, name){
        await this.get(id)
        await TypeContentEntity.update({name}, {where: {id}})
        const response = await this.get(id)
        return response;
    }

    async delete(id){
        await this.get(id)
        await TypeContentEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new TypeBlogService()