const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");
const auth = require("../middleware/auth");
router.post("/add", auth.validateEvent, EventController.addEvent);

module.exports = router;
