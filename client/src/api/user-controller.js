import startPoint from './index'
import axios from 'axios'

class UserController{
    constructor() {
        this.domain = `${startPoint.domain}${startPoint.points['users']}`;
    }

    async getAll(){
        return await axios.get(this.domain);
    }
    async getOnId(id){
        return await axios.get(this.domain, {params: id});
    }

    async registration(login, password, email){
    }
}

export default new UserController()