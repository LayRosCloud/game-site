import axios from 'axios'
import HashTable from './HashTable'
class StartPoint{
    static domain = 'http://localhost:5000'

    static async start(){
        const hrefPoint = this.domain + '/api/'
        const hrefs = await axios.get(hrefPoint)
        hrefs.data.map(href => {
            HashTable.addToCollection(href.rel, `${this.domain}${href.href}`)
        })

    }
}
export default StartPoint