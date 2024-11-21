const ChiTietSanPhamControllers = require("../controllers/chi_tiet_san_pham.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietSanPhamControllers.create
)
router.put(
    '/update',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietSanPhamControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    ChiTietSanPhamControllers.getAll
)
router.get(
    '/info',
    AuthMiddlewares.verifyToken,
    ChiTietSanPhamControllers.getOne
)
router.delete(
    '/delete',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietSanPhamControllers.delete
)

module.exports = router;