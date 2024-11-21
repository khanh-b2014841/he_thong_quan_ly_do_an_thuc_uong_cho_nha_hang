const SanPhamControllers = require("../controllers/san_pham.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/actionsFile");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    upload.single('file'),
    SanPhamControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    upload.single('file'),
    SanPhamControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    SanPhamControllers.getAll
)
router.get(
    '/info/:ma',
    AuthMiddlewares.verifyToken,
    SanPhamControllers.getOne
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    SanPhamControllers.delete
)

module.exports = router;