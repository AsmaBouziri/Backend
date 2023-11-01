const Author = require("../models/Author");

const addAuthor = (req, res) => {
  const auth = new Author(req.body);
  auth
    .save()
    .then(() => {
      res.status(201).json({
        model: auth,
        message: "Auteur ajouté!",
      });
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

const getAllAuthors = (req, res) => {
  Author.find()
    .then((auths) =>
      res.status(200).json({
        Livres: auths,
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
  getAllAuthors,
  addAuthor,
};
