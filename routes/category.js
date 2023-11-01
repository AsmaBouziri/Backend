const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.post("/addCat", categoryController.addCategory);
router.get("/all", categoryController.getAllCategorys);

module.exports = router;
