const Event = require("../models/event");

const addEvent = (req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then(() => {
      res.status(201).json({
        model: event,
        message: "objet créé!",
      });
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

module.exports = { addEvent };
