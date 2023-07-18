import HashTable from "./HashTable";
import $api from "./index";

class ContentGamesController {
    async getAll(blogId){
        const domain = `${HashTable.getValue('contentGames')}?blogId=${blogId}`
        return await $api.get(domain);
    }
    async getById(id){
        const domain = `${HashTable.getValue('contentGames')}${id}`;
        return await $api.get(domain);
    }
}
export default new ContentGamesController()