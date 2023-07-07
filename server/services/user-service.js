const {UserEntity, RoleEntity} = require('../core/models')
const UserDto = require('../core/dto/UserDto')
const uuid = require('uuid')
const tokenService = require('./token-service')
const mailService = require('./mail-service')
const bcrypt = require("bcrypt");
const ApiError = require('../error/api-error')

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

    async create(login, email, password, avatarImage, roleId){
        roleId = roleId || 1;
        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 3)

        const check = await UserEntity.findOne({where: {email}})

        if(check){
            throw new Error("Ошибка! Такой Email существует!")
        }

        const result = await UserEntity.create({login, email, password: hashPassword, activationLink, avatarImage, roleId});
        const dto = new UserDto(result);

        await mailService.sendActivationMail(email, `${process.env.DOMAIN_URL}api/v1/users/activate/${activationLink}`, login);

        const tokens = await tokenService.generateTokens(result)

        return {...dto, ...tokens};
    }

    async login(email, password){
        const response = await UserEntity.findOne({where: {email}})
        if(!response){
            throw new Error("Пользователь с таким email не существует")
        }
        const isPasswordEquals = await bcrypt.compare(password, response.password)
        if(!isPasswordEquals){
            return new Error('Неверный пароль')
        }
        const userDto = new UserDto(response);
        const tokens = await tokenService.generateTokens({...userDto})
        return {...userDto, ...tokens}
    }

    async activate(activationLink){
        const response = await UserEntity.findOne({where: {activationLink}})
        if(!response){
            throw new Error('Ошибка! Ссылка не найдена!')
        }

        response.isActivated = true;
        await response.save()
        return response;
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async update(id, login, status, email, password, avatarImage, isBanned, roleId, refreshToken){
        await this.get(id)
        const hashPassword = bcrypt.hash(password, 3)
        roleId = roleId || 1;
        avatarImage = avatarImage || null;
        const data = await tokenService.validateRefreshToken(refreshToken)
        if(data.id !== id && data.roleId !== 2){
            throw new Error('Вы не можете изменить другого пользователя!')
        }
        await UserEntity.update( {login, status, email, password: hashPassword, avatarImage, isBanned, roleId}, {where: {id}})
        const response = await this.get(id)
        return response;
    }

    async refresh(refreshToken){
        if(!refreshToken) {
            throw ApiError.forbidden('Токен отсутствует')
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.forbidden('Пользователь не авторизован')
        }
        const user = await UserEntity.findOne({where: {id: userData.id}})

        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto})
        return {...userDto, ...tokens}
    }

    async delete(id, refreshToken){
        await this.get(id)

        const data = await tokenService.validateRefreshToken(refreshToken)
        if(data.id !== id){
            throw new Error('Вы не можете удалить другого пользователя!')
        }
        await UserEntity.destroy({where: {id}});
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new UserService()