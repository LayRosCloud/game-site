import axios from 'axios'
import HashTable from './HashTable'

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
    if(error.status === 401){

    }
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