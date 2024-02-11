const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/sectors", userController.sectors);

module.exports = router;