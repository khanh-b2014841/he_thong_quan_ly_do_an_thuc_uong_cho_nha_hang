const CongThucControllers = require("../controllers/cong_thuc.controller");
const AuthMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post(
  "/create",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  CongThucControllers.create
);
router.put(
  "/update",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  CongThucControllers.update
);
router.get("/all", AuthMiddlewares.verifyToken, CongThucControllers.getAll);
router.get("/info", AuthMiddlewares.verifyToken, CongThucControllers.getOne);
router.delete(
  "/delete",
  AuthMiddlewares.verifyToken,
  AuthMiddlewares.adminRole,
  CongThucControllers.delete
);

module.exports = router;
