const Task = require("../models/task");

const getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) =>
      res.status(200).json({
        model: tasks,
        message: "success!",
      })
    )

    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction ",
      });
    });
};

const getTaskById = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: task,
          message: "objet trouvé!",
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

const addTask = (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).json({
        model: task,
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

const updateTask = (req, res) => {
  Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: task,
          message: "objet modifié!",
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

const deleteTask = (req, res) => {
  // console.log(req.params.id);
  // res.send(req.body);*

  Task.deleteOne({ _id: req.params.id })
    .then((tasks) =>
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

module.exports = { deleteTask, updateTask, addTask, getTaskById, getAllTasks };
