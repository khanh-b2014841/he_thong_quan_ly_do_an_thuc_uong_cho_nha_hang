const VaiTroControllers = require("../controllers/vai_tro.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.update
)
router.get(
    '/info-ma/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.getOne
)
router.get(
    '/info-key/:key',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.getOne
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.getAll
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    VaiTroControllers.delete
)

module.exports = router;