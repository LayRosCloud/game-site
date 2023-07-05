const Router = require('express')
const router = new Router();

const hateoas = require('./hateoas')
const blogRouter = require('./blog-router')

const linkRouter = require('./link-router')

const previewRouter = require('./preview-router')
const reviewRouter = require('./review-router')

const roleRouter = require('./role-router')
const userRouter = require('./user-router')

const commentsRouter = require('./comments-router')
const contentGameRouter = require('./content-game-router')
const gameGenreRouter = require('./game-genre-router')
const genreRouter = require('./genre-router')
const gameRouter = require('./game-router')

const typeContentRouter = require('./type-content-router')
const typeServiceRouter = require('./type-service-router')
const typeBlogRouter = require('./type-blog-router')
const typeReleaseRouter = require('./type-release-router')

const authMiddleware = require('../middleware/auth-middleware')


router.use('/', hateoas)
router.use(`${process.env.URL_VERSION}${process.env.URL_BLOGS}`, blogRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_COMMENTS}`, commentsRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_CONTENT_GAMES}`, contentGameRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_GAMES_GENRE}`, gameGenreRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_GENRES}`, genreRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_LINKS}`, linkRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_PREVIEWS}`, previewRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_REVIEWS}`, reviewRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_ROLES}`,authMiddleware, roleRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_USERS}`, userRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_GAMES}`, gameRouter)

router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_BLOGS}`, authMiddleware, typeBlogRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_SERVICES}`, authMiddleware, typeServiceRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_CONTENTS}`, authMiddleware, typeContentRouter)
router.use(`${process.env.URL_VERSION}${process.env.URL_TYPE_RELEASES}`, authMiddleware, typeReleaseRouter)

module.exports = router;