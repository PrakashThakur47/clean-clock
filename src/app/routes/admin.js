const router = require("express").Router();
const validations = require("../middlewares/validations");
const authController = require("../controller/admin/authController");
const GroupController = require("../controller/admin/groupController");
const isAuth = require("../middlewares/isAuth");

router.post("/login", authController.login);
router.post("/create-update-group", isAuth, GroupController.createUpdateGroup);
router.post("/fetch-group", isAuth, GroupController.fetchGroupsByStatus);
router.post("/approve-group-request", isAuth, GroupController.approveRequest);
router.post("/enable-disable-group", isAuth, GroupController.disableStatus);


module.exports = router;
