import HashTable from "./HashTable";
import $api from "./index";

class CommentsController {
    async getAll(limit, page, gameId){
        const domain = `${HashTable.getValue('comments')}?gameId=${gameId}`
        return $api.get(domain)

    }

    async getById(id){
        const domain = `${HashTable.getValue('comments')}${id}`;
        return await $api.get(domain);
    }

    async create(gameId, userId, content){
        const domain = `${HashTable.getValue('comments')}`;
        return await $api.post(domain, {
            gameId, userId, content
        })
    }
}

export default new CommentsController()