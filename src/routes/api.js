const express = require("express");
const UsersController = require("../controllers/users.controller");
const AuthMiddleware = require("../middleware/auth.verify.middleware");

const router = express.Router();

// Public routes: Registration and Login
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);

// Protected route: Profile update requires token
router.post("/profile-update", AuthMiddleware, UsersController.profileUpdate);

module.exports = router;
