const DonGaLuongControllers = require("../controllers/don_gia_luong.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    DonGaLuongControllers.create
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    DonGaLuongControllers.getAll
)
router.delete(
    '/delete',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    DonGaLuongControllers.delete
)

module.exports = router;