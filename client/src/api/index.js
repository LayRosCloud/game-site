import axios from 'axios'
import HashTable from './HashTable'
import {routes} from "../routes/routes";
import {redirect} from "react-router-dom";

const API_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
})

$api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})
$api.interceptors.response.use((config)=>{
    return config;
}, (error) => {
    return Promise.reject(error.response.data);
})

export function start(){
    const hrefPoint = API_URL + '/api/'
    axios.get(hrefPoint).then(links => {
        links.data.map(link => {
            HashTable.addToCollection(link.rel, `${API_URL}${link.href}`)
        })
    })
}

export default $api