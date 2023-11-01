const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { response } = require("express");

module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: "utilisateur non trouvé!",
          });
        } else {
          req.auth = {
            userId: userId,
            role: user.role,
          };
          next();
        }
      })
      .catch(() => {});
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports.isAdmin = (req, res, next) => {
  try {
    if (req.auth.role === "Admin") {
      next();
    } else {
      res.status(403).json({ error: "no access th this route " });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
