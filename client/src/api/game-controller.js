import HashTable from "./HashTable";
import $api from "./index";
import axios from "axios";

class GameController {
    async getAll(limit, page){
        const domain = HashTable.getValue('games');
        return await axios.get(domain)
    }
    async getById(id){
        const domain = `${HashTable.getValue('games')}${id}`;
        return await $api.get(domain)
    }
}

export default new GameController()