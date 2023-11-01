const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Horror", "Mystery", "Drama"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
