const Category = require("../models/Category");

const addCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then(() => {
      res.status(201).json({
        model: category,
        message: "Category ajouté!",
      });
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

const getAllCategorys = (req, res) => {
  Category.find()
    .then((catego) =>
      res.status(200).json({
        Livres: catego,
        message: "success!",
      })
    )

    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction des livres ! ",
      });
    });
};

module.exports = {
  getAllCategorys,
  addCategory,
};
