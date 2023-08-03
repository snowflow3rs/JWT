const authorController = require("../controllers/authController");
const middleControllers = require("../controllers/middlewareControllers");

const router = require("express").Router();

router.post("/register", authorController.registerUser);
router.post("/login", authorController.loginUser);
router.post("/refresh", authorController.refreshToken);
router.post(
  "/logout",
  middleControllers.verfiyToken,
  authorController.logOutUser
);
module.exports = router;
