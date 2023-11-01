const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/author");

router.post("/addAuth", AuthorController.addAuthor);
router.get("/all", AuthorController.getAllAuthors);

module.exports = router;
