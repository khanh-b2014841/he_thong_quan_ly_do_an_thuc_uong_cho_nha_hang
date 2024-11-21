const KhoControllers = require("../controllers/kho.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    KhoControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    KhoControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    KhoControllers.getAll
)
router.get(
    '/info/:ma',
    AuthMiddlewares.verifyToken,
    KhoControllers.getOne
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    KhoControllers.delete
)

module.exports = router;