const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const TaskController = require("../controllers/tasks.controller");
const AuthMiddleware = require("../middleware/auth.verify.middleware");

// User Routes
router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profile-update", AuthMiddleware, UsersController.profileUpdate);

// Task Routes
router.post("/tasks", AuthMiddleware, TaskController.createTask);
router.delete("/tasks/:id", AuthMiddleware, TaskController.deleteTask);
router.patch("/tasks/:id/status", AuthMiddleware, TaskController.updateStatus);
router.get("/tasks/status/:status", AuthMiddleware, TaskController.listTaskByStatus);
router.get("/tasks/status-count", AuthMiddleware, TaskController.tasksStatusByCount);


module.exports = router;
