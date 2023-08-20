const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.dashboard);
router.get("/view/:id", adminController.view);
router.get("/edit/:id", adminController.edit);

router.post("/search", adminController.searchUser);
router.put("/edit/:id", adminController.editUser);
router.delete("/edit/:id", adminController.deleteUser);

module.exports = router;
