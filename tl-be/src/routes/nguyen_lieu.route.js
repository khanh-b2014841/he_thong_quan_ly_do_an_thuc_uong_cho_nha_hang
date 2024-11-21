const NguyenLieuControllers = require("../controllers/nguyen_lieu.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");
const { upload } = require("../utils/actionsFile");

const router = require("express").Router();

router.post(
    '/create',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    upload.single('file'),
    NguyenLieuControllers.create
)
router.put(
    '/update/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    upload.single('file'),
    NguyenLieuControllers.update
)
router.get(
    '/all',
    AuthMiddlewares.verifyToken,
    NguyenLieuControllers.getAll
)
router.get(
    '/info/:ma',
    AuthMiddlewares.verifyToken,
    NguyenLieuControllers.getOne
)
router.delete(
    '/delete/:ma',
    AuthMiddlewares.verifyToken,
    AuthMiddlewares.adminRole,
    NguyenLieuControllers.delete
)

module.exports = router;