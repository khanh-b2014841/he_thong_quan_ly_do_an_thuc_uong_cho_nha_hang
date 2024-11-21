const CaControllers = require("../controllers/ca.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    CaControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    CaControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    CaControllers.getAll
)
router.get(
    '/info/:ma',
    AuthMiddlewares.verifyToken,
    CaControllers.getOne
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    CaControllers.delete
)

module.exports = router;