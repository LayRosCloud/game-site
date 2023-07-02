const {TypeBlogEntity} = require('../core/models')
class TypeBlogService{
    async getAll(){
        return await TypeBlogEntity.findAll();
    }
    async get(id){
        const response = await TypeBlogEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await TypeBlogEntity.create({name});
    }

    async update(id, name){
        let response = await this.get(id)
        await TypeBlogEntity.update({name}, {where: {id}})
        response = await this.get(id)
        return response;
    }

    async delete(id){
        await this.get(id)
        await TypeBlogEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new TypeBlogService()