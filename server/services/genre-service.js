const {GenreEntity} = require('../core/models')
class GenreService{
    async getAll(){
        return await GenreEntity.findAll();
    }
    async get(id){
        const response = await GenreEntity.findOne({where: {id}})
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(name){
        return await GenreEntity.create({name});
    }

    async update(id, name){
        await this.get(id)
        await GenreEntity.update({name}, {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await GenreEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new GenreService()