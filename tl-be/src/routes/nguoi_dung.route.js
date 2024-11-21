const NguoiDungControllers = require("../controllers/nguoi_dung.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
  "/create",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  NguoiDungControllers.create
);
router.get(
  "/token",
  AuthMiddlewares.verifyToken,
  NguoiDungControllers.updateAccessToken
);
router.put(
  "/update/:ma",
  AuthMiddlewares.verifyToken,
  NguoiDungControllers.update
);
router.get(
  "/all",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  NguoiDungControllers.getAll
);
router.get("/info", AuthMiddlewares.verifyToken, NguoiDungControllers.getOne);
router.post("/login", NguoiDungControllers.logIn);
router.put(
  "/lock",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  NguoiDungControllers.lock
);
router.delete(
  "/logout",
  AuthMiddlewares.verifyToken,
  NguoiDungControllers.logout
);

module.exports = router;
