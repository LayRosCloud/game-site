const Router = require('express');
const router = new Router();
const controller = require('../controllers/role-controller')
const authMiddleware = require('../middleware/auth-middleware')
const roleMiddleware = require('../middleware/role-middleware')

router.get('/', authMiddleware, roleMiddleware([2]), controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;