import HashTable from "./HashTable";
import $api from "./index";

class PreviewsController {
    async getAll(){
        const domain = HashTable.getValue('previews');
        return await $api.get(domain)
    }
    async getById(id){
        const domain = `${HashTable.getValue('previews')}${id}`;
        return await $api.get(domain)
    }
}

export default new PreviewsController()