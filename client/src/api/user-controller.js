import HashTable from "./HashTable";
import $api from "./index";

class UserController{

    async getAll(){
        const domain = HashTable.getValue('users')
        return await $api.get(domain);
    }

    async getById(id){
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

    async refresh(){
        const domain = HashTable.getValue('users-refresh')
        return await $api.get(domain);
    }

    async logout(){
        const domain = HashTable.getValue('users-logout')
        await $api.post(domain);
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('isAuth')
    }


}

export default new UserController()