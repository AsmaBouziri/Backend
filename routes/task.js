const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const auth = require("../middleware/auth");

router.get("/t", auth.loggedMiddleware, auth.isAdmin, taskController.getAllTasks);

router.get("/id/:id", auth.loggedMiddleware, taskController.getTaskById);

router.post("/add", auth.loggedMiddleware, taskController.addTask);

router.patch("/:id", auth.loggedMiddleware, taskController.updateTask);

router.delete("/delete/:id", auth.loggedMiddleware, taskController.deleteTask);

module.exports = router;
