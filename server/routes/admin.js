const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.dashboard);
router.get("/login", adminController.loginpage);
router.get("/view/:id", adminController.view);
router.get("/edit/:id", adminController.edit);
router.get("/add", adminController.addUser);

router.post("/login", adminController.login);
router.post("/add", adminController.createUser);
router.post("/search", adminController.searchUser);
router.put("/edit/:id", adminController.editUser);
router.delete("/edit/:id", adminController.deleteUser);

module.exports = router;
