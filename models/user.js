const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("name").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.methods.toPublic = function () {
  const user = this.toObject();
  delete user.password;
  user.name = this.name;
  console.log(user.name);
  return user;
};

module.exports = mongoose.model("User", userSchema);
