const Router = require('express');
const router = new Router();
const controller = require('../controllers/user-controller')
const { body } = require('express-validator')

router.get('/', controller.getAll)

//Все что связано с регистрацией
router.post('/',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    controller.create)

router.get('/activate/:link', controller.activate)
router.get('/refresh', controller.refresh)
router.post('/login', controller.login)
router.post('/logout', controller.logout)

router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.get('/:id', controller.get)


module.exports = router;