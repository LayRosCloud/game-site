const Router = require('express');
const router = new Router();
const controller = require('../controllers/review-controller')
const authMiddleware = require('../middleware/auth-middleware')

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

module.exports = router;