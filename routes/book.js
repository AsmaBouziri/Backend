const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");


router.post("/Books",bookController.addBook)
router.get("/All",bookController.getAllBooks)
router.get("/id/:id",bookController.getBookByID)
router.patch("/update/:id",bookController.updateBOOK)
router.delete("/delete/:id",bookController.deleteBook)



module.exports = router;