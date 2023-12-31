const {GameEntity, TypeReleaseEntity} = require('../core/models')
class GameService{
    async getAll(limit, page){
        limit = limit || 9;
        page = page || 1;
        const offset = limit * page - limit;
        limit = Number(limit);
        return await GameEntity.findAndCountAll({
            include: TypeReleaseEntity,
            limit, offset
        });
    }
    async get(id){
        const response = await GameEntity.findOne({
            where: {id},
            include: TypeReleaseEntity
        }
        )
        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }
        return response;
    }

    async create(title, description, preview, developer, publisher, urlDownload, typeReleaseId){
        return await GameEntity.create({
            title,
            description,
            preview,
            developer,
            publisher,
            urlDownload,
            typeReleaseId
        });
    }

    async update(id,title, description, preview, developer, publisher, urlDownload, typeReleaseId){
        await this.get(id)
        await GameEntity.update({
                title,
                description,
                preview,
                developer,
                publisher,
                urlDownload,
                typeReleaseId},
                {where: {id}});
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await GameEntity.destroy(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new GameService()