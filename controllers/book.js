const Book = require("../models/book");
const Auteur = require("../models/Author");

const validator = require("validator");

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

//FindByAuthor
const getBookByAuthor = (req, res) => {
  const authorId = req.params.id;
  console.log(authorId);
  Book.findByAuthor(authorId)
    .then((booksByAuthor) => {
      if (!booksByAuthor) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          Book: booksByAuthor,
          message: "livre trouvé!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// //FindByAuthor
// const getBookByAuthor = async (req, res) => {
//   try {
//     const authorId = req.params.id;
//     const booksByAuthor = await Book.findByAuthor(authorId);
//     console.log(booksByAuthor);
//     res.json(booksByAuthor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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

const createBook = async (req, res) => {
  const { Author, title } = req.body;
  console.log(Author);
  Book.findByAuthor(Author)
    .then((authorBooks) => {
      if (!authorBooks) {
        return res
          .status(400)
          .json({ error: "L'auteur doit avoir déjà écrit d'autres livres" });
      } else {
        // L'auteur n'a pas encore écrit de livres
        const newBook = new Book(req.body);
        newBook.save().then(() => res.status(201).json(newBook));
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getAllBooks,
  addBook,
  getBookByID,
  updateBOOK,
  deleteBook,
  getBookByAuthor,
  createBook,
};
