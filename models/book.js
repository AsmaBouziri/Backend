const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true, min: 10, max: 50 },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  NbPages: { type: Number, required: true },
  Category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("Book", BookSchema);