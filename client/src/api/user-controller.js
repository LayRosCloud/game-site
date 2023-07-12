import HashTable from "./HashTable";
import $api from "./index";

class UserController{

    async getAll(){
        const domain = HashTable.getValue('users')
        return await $api.get(domain);
    }
    async getOnId(id){
        const domain = HashTable.getValue('users')
        return await $api.get(domain, {params: id});
    }

    async registration(login, password, email){
        const domain = HashTable.getValue('users')
        return await $api.post(domain, {
            login, email, password
        })
    }

    async login(email, password){
        const domain = HashTable.getValue('users-login')
        return await $api.post(domain, {
            email, password
        })
    }


}

export default new UserController()