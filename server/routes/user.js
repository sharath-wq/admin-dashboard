const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.home);
router.get("/login", userController.loginpage);
router.get("/home", userController.homepage);
router.get("/logout", userController.logout);
router.get("/edit-profile", userController.editProfile);

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/update-profile", userController.updateProfile);

module.exports = router;
