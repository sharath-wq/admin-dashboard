const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.home);
router.get("/login", userController.loginpage);
router.get("/home", userController.homepage);
router.get("/logout", userController.logout);

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
