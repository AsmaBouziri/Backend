const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const BookSchema = mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true, min: 10, max: 50 },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  NbPages: { type: Number, required: true },
  Category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

BookSchema.plugin(idValidator);

BookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ Author: authorId }).populate("Author");
};

module.exports = mongoose.model("Book", BookSchema);
