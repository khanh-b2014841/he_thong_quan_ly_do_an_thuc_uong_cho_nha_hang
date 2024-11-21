const NhaSanXuatControllers = require("../controllers/nha_san_xuat.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    NhaSanXuatControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    NhaSanXuatControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    NhaSanXuatControllers.getAll
)
router.get(
    '/info/:ma',
    AuthMiddlewares.verifyToken,
    NhaSanXuatControllers.getOne
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    NhaSanXuatControllers.delete
)

module.exports = router;