const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", auth.validateSignup, userController.signup);
router.post("/login", userController.login);

module.exports = router;
