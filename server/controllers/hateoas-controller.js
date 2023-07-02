const service = require('../services/hateoas-service')
const ApiError = require('../error/api-error')
class HateoasController{
    getAll(req, res){
        const list = service.getAll();
        return res.json(list)
    }

    get(req, res, next){
        const {rel} = req.params;

        let link = null;

        const hrefs = service.getAll()

        hrefs.forEach(href => {
            if(href.rel === rel){
                link = href;
            }
        })

        if(!link){
            return next(ApiError.badRequest('Ссылки не существует!'))
        }

        return res.json(link)
    }
}

module.exports = new HateoasController()