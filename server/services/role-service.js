const {RoleEntity} = require('../core/models')
class RoleService{
    async getAll(){
        return await RoleEntity.findAll();
    }
    async get(id){
        const response = await RoleEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await RoleEntity.create({name});
    }

    async update(id, name){
        await this.get(id)
        await RoleEntity.update({name}, {where: {id}})
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await RoleEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new RoleService()