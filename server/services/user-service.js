const {UserEntity} = require('../core/models')
const uuid = require('uuid')
class UserService{
    async getAll(){
        return await UserEntity.findAll();
    }

    async get(id){
        const response = await UserEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(login, email, password, avatarImage, roleId){
        roleId = roleId || 1;
        avatarImage = avatarImage || null;
        const activationLink = uuid.v4();
        return await UserEntity.create({login, email, password, activationLink, avatarImage, roleId});
    }

    async update(id, login, email, password, avatarImage, isBanned, roleId){
        await this.get(id)

        roleId = roleId || 1;
        avatarImage = avatarImage || null;

        await UserEntity.update({login, email, password, avatarImage, isBanned, roleId}, {where: {id}})
        const response = await this.get(id)
        return response;
    }

    async delete(id){
        await this.get(id)
        await UserEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new UserService()