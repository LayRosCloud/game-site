import HashTable from "./HashTable";
import $api from "./index";

class BlogController {
    async getAll(limit, page, typeBlogId, gameId){
        limit = limit || 9;
        page = page || 1;
        const domain = `${HashTable.getValue('blogs')}?limit=${limit}&page=${page}`;
        const offset = limit * page - limit;
        if(gameId && typeBlogId){
            return $api.get(`${domain}&gameId=${gameId}&typeBlogId=${typeBlogId}`);
        }
        else if(gameId && !typeBlogId){
            return $api.get(`${domain}&gameId=${gameId}`)
        }
        else if(!gameId && typeBlogId){
            return $api.get(`${domain}&typeBlogId=${typeBlogId}`)
        }

        return $api.get(domain)

    }
    async getById(id){
        const domain = `${HashTable.getValue('blogs')}${id}`;
        return await $api.get(domain);
    }
}
export default new BlogController()