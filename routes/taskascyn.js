const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const auth = require("../middleware/auth");

router.get("/t", taskController.getAllTasks);

router.get("/id/:id", taskController.getTaskById);

router.post("/add", taskController.addTask);

router.patch("/:id", taskController.updateTask);

router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
