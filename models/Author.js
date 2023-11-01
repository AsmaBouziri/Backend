const mongoose = require("mongoose");

const AuteurSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    nationality: { type: String, required: true }
});

module.exports = mongoose.model("Author", AuteurSchema);