const LichLamViecControllers = require("../controllers/lich_lam_viec.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    LichLamViecControllers.create
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    LichLamViecControllers.getAll
)
router.delete(
    '/delete',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    LichLamViecControllers.delete
)

module.exports = router;