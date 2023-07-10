import axios from 'axios'
import HashTable from "./HashTable";

class UserController{

    async getAll(){
        const domain = HashTable.getValue('users')
        return await axios.get(domain);
    }
    async getOnId(id){
        const domain = HashTable.getValue('users')
        return await axios.get(domain, {params: id});
    }

    async registration(login, password, email){
        const domain = HashTable.getValue('users')
        return await axios.post(domain, {
            login, email, password
        })

    }
}

export default new UserController()