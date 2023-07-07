const Router = require('express');
const router = new Router();
const controller = require('../controllers/type-content-controller')
const roleMiddleware = require("../middleware/role-middleware");

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', roleMiddleware(['admin']), controller.create)
router.put('/:id', roleMiddleware(['admin']), controller.update)
router.delete('/:id', roleMiddleware(['admin']), controller.delete)

module.exports = router;