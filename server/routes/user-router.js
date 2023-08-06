const Router = require('express');
const router = new Router();
const controller = require('../controllers/user-controller')
const { body } = require('express-validator')
const roleMiddleware = require("../middleware/role-middleware");
const authMiddleware = require('../middleware/auth-middleware')

//Все что связано с регистрацией
router.post('/',
    body('login').isLength({min: 4, max: 32}),
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    controller.create)

router.get('/activate/:link', controller.activate)
router.get('/refresh', controller.refresh)
router.post('/login', controller.login)
router.post('/logout', controller.logout)

// с редактированием профиля
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

router.get('/', controller.getAll)
router.get('/:link', controller.get)


module.exports = router;