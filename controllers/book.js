const Book = require("../models/book");
const Auteur = require("../models/Author");

/*ajouter livre*/
const addBook = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        model: book,
        message: "Livre ajouté!",
      });
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

/*Afficher tous les livres*/
const getAllBooks = (req, res) => {
  Book.find()
    .populate("Author")
    .populate("Category")
    .then((books) =>
      res.status(200).json({
        Livres: books,
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

/*Afficher un livre selon id*/
const getBookByID = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .populate("Author")
    .populate("Category")
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          Livre: book,
          message: "livre trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

// /*Afficher les livres selon nom auteur*/
// const getBookByAuthName = (req, res) => {
//   Book.find({ "Author.firstName": req.params.nom })
//     .populate("Author")
//     .populate("Category")
//     .then((livres) => {
//       console.log(livres)
//       if (!livres) {
//         return res.status(404).json({
//           message: "Aucun livre trouvé pour cet auteur.",
//         });
//       } else {
//         res.status(200).json({
//           Livres: livres,
//           message: "Livres trouvés",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error.message,
//         message: "Problème d'extraction des livres!",
//       });
//     });
// };

/*Modifier un livre avec son id en paramétre */
const updateBOOK = (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          Livre: book,
          message: "livre modifié!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

/*suprimmer un livre */
const deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
      });
    });
};

module.exports = {
  getAllBooks,
  addBook,
  getBookByID,
  updateBOOK,
  deleteBook,
};
