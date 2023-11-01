const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  role :{type :String ,enum: ['Admin','User']}
});

module.exports = mongoose.model("User", userSchema);
