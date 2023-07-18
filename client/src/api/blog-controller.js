import HashTable from "./HashTable";
import $api from "./index";

class BlogController {
    async getAll(limit, page, gameId, typeBlogId){
        limit = limit || 9;
        page = page || 1;
        const domain = HashTable.getValue('blogs');
        const offset = limit*page - limit;
        if(gameId && typeBlogId){
            return $api.get(domain, {
                query: {limit, offset: offset}
            });
        }
        else if(gameId && !typeBlogId){
            return $api.get(domain, {
                query: {limit, offset, gameId}
            })
        }
        else if(!gameId && typeBlogId){
            return $api.get(domain, {
                query: {limit, offset, typeBlogId}
            })
        }

        return $api.get(domain, {
            query: {limit, offset}
        })

    }
    async getById(id){
        const domain = `${HashTable.getValue('blogs')}${id}`;
        return await $api.get(domain);
    }
}
export default new BlogController()