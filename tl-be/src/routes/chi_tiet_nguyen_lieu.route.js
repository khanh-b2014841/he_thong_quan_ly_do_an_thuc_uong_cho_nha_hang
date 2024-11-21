const ChiTietNguyenLieuControllers = require("../controllers/chi_tiet_nguyen_lieu.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietNguyenLieuControllers.create
)
router.put(
    '/update',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietNguyenLieuControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    ChiTietNguyenLieuControllers.getAll
)
router.get(
    '/info',
    AuthMiddlewares.verifyToken,
    ChiTietNguyenLieuControllers.getOne
)
router.delete(
    '/delete',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    ChiTietNguyenLieuControllers.delete
)

module.exports = router;