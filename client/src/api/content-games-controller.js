import HashTable from "./HashTable";
import $api from "./index";

class ContentGamesController {
    async getAll(blogId){
        const domain = `${HashTable.getValue('contentGames')}?blogId=${blogId}`
        return await $api.get(domain);
    }
}
const module = new ContentGamesController();
export default module