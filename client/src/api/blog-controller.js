import HashTable from "./HashTable";
import $api from "./index";
import axios from "axios";

class BlogController {
    async getAll(limit, page){
        limit = limit || 9;
        page = page || 1;

        const domain = HashTable.getValue('blogs');
        return axios.get(domain, {
            query: {limit, offset: 0}
        });
    }
}
export default new BlogController()