const {BlogEntity, GameEntity, TypeBlogEntity} = require('../core/models')
class BlogService{
    async getAll(gameId, typeBlogId, limit , page){
        limit = limit || 9
        page = page || 1

        const offset = limit * page - limit;

        limit = Number(limit)

        const orderParameter = [['createdAt', 'DESC']];

        if(gameId && !typeBlogId){
            return  await BlogEntity.findAndCountAll({
                include: [GameEntity, TypeBlogEntity],
                where: {gameId}, limit, offset,
                order: orderParameter})
        }
        else if(!gameId && typeBlogId){
            return  await BlogEntity.findAndCountAll({
                include: [GameEntity, TypeBlogEntity],
                where: {typeBlogId}, limit, offset,
                order: orderParameter})
        }
        else if(gameId && typeBlogId){
            return  await BlogEntity.findAndCountAll({
                include: [GameEntity, TypeBlogEntity],
                where: {gameId, typeBlogId}, limit, offset,
                order: orderParameter})
        }

        return await BlogEntity.findAndCountAll({
            include: [GameEntity, TypeBlogEntity], limit, offset,
            order: orderParameter});
    }
    async get(id){
        const response = await BlogEntity.findOne(
            {
                where: {id},
                include: [GameEntity, TypeBlogEntity]
            })

        if(!response){
            throw new Error('Ошибка! Объект не найден!')
        }

        return response;
    }
    async create(title,description,preview,gameId, typeBlogId){
        return await BlogEntity.create({
            title,
            description,
            preview,
            gameId,
            typeBlogId});
    }
    async update(id,title,description,preview, gameId, typeBlogId){
        await this.get(id)
        await BlogEntity.update(
            {title, description, preview, gameId, typeBlogId},
            {where: {id}})
        return await this.get(id);
    }

    async delete(id){
        await this.get(id)
        await BlogEntity.drop(id);
        return {status: 200, message: `Объект с id ${id} успешно удален!`}
    }
}
module.exports = new BlogService()