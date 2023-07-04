const {UserEntity, RoleEntity} = require('../core/models')
const UserDto = require('../core/dto/UserDto')
const uuid = require('uuid')
const tokenService = require('./token-service')
class UserService{
    async getAll(){
        const results = await UserEntity.findAll({include: RoleEntity})
        const response = [];
        results.map(result => {
            response.push(new UserDto(result))
        })
        return response;
    }

    async get(id){
        const response = await UserEntity.findOne({where: {id}, include: RoleEntity})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return new UserDto(response);
    }

    async create(login, email, password, avatarImage, roleId, identityItem){
        roleId = roleId || 1;
        avatarImage = avatarImage || null;
        const activationLink = uuid.v4();
        const check = await UserEntity.findOne({where: {email}})
        if(check){
            throw new Error("Ошибка! Такой Email существует!")
        }

        const result = await UserEntity.create({login, email, password, activationLink, avatarImage, roleId});
        const tokens = await tokenService.generateTokens(result, identityItem)
        const dto = new UserDto(result);
        return {...dto, ...tokens};
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