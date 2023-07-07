const Router = require('express');
const router = new Router();
const controller = require('../controllers/role-controller')
const roleMiddleware = require('../middleware/role-middleware')

router.get('/', roleMiddleware(['admin']), controller.getAll)
router.get('/:id', roleMiddleware(['admin']), controller.get)
router.post('/', roleMiddleware(['admin']), controller.create)
router.put('/:id', roleMiddleware(['admin']), controller.update)
router.delete('/:id', roleMiddleware(['admin']), controller.delete)

module.exports = router;