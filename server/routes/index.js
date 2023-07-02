const Router = require('express')
const router = new Router();
const hateoas = require('./hateoas')
const blogRouter = require('./blog-router')
const typeBlogRouter = require('./type-blog-router')

router.use('/', hateoas)
router.use(`${process.env.URL_VERSION}${process.env.URL_BLOGS}`, blogRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_BLOGS}`, typeBlogRouter)

module.exports = router;