import axios from 'axios'
import HashTable from './HashTable'

const API_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
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