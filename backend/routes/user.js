const middleControllers = require("../controllers/middlewareControllers");
const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", middleControllers.verfiyToken, userController.getAllUsers);
router.delete(
  "/:id",
  middleControllers.verfiyTokenAndAdminAuth,
  userController.deleteUser
);
module.exports = router;
