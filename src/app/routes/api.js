const router = require("express").Router();

const authController = require("../controller/api/authController");
const spamController = require("../controller/api/spamController");
const postController = require("../controller/api/postController");

router.post("/login", authController.phoneLogin);

// Posts route
router.post("/posts", postController.postCreate);
router.get("/posts/:post_id?", postController.postGet);

// Spam Route
router.post("/spams", spamController.spamCreate);
router.get("/spams/:spam_id?", spamController.spamGet);

module.exports = router;
