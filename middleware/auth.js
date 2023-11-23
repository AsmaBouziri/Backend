const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { response } = require("express");
const Joi = require("joi");

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

const roles = ["admin", "user"];
module.exports.validateSignup = (req, res, next) => {
  const valideUser = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .valid(...roles)
      .required(),
  });

  const { error } = valideUser.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports.validateEvent = (req, res, next) => {
  const valideEvent = Joi.object({
    title: Joi.string().required(),
    debutDate: Joi.date().iso().required(),
    finDate: Joi.date().iso().min(Joi.ref("debutDate")).required(),
  });

  const { error } = valideEvent.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
