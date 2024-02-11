const express = require("express");
const adminController = require("../../controllers/adminController");
const router = express.Router();

router.post("/register", adminController.register);
router.post("/add-sector",adminController.loginRequired, adminController.addSector);
router.post("/login", adminController.login);

module.exports = router;