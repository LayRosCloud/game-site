const Router = require('express');
const router = new Router();
const controller = require('../controllers/game-controller')
const roleMiddleware = require("../middleware/role-middleware");

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', roleMiddleware(['developer', 'admin']), controller.create)
router.put('/:id', roleMiddleware(['developer', 'admin']), controller.update)
router.delete('/:id', roleMiddleware(['developer', 'admin']), controller.delete)

module.exports = router;