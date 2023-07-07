import axios from 'axios'
class StartPoint{
    static points = [];
    static domain = 'http://localhost:5000'

    static async start(){
        const hrefPoint = this.domain + '/api/'
        const hrefs = await axios.get(hrefPoint)
        hrefs.data.map(href => {
            this.points[href.rel] = href.href
        })
    }
}
export default StartPoint