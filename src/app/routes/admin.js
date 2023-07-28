const router = require("express").Router();
const validations = require("../middlewares/validations");
const authController = require("../controller/admin/authController");

router.post("/login", authController.login);

module.exports = router;
