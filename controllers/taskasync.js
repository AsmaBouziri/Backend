const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  try {
    res.status(200).json({
      model: tasks,
      message: "success!",
    });
  } catch {
    res.status(400).json({
      error: Error.message,
      message: "probleme d'extraction ",
    });
  }
};

const getTaskById = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  try {
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
  } catch {
    res.status(400).json({
      error: Error.message,
      message: "Données invalides!",
    });
  }
};

const addTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  try {
    res.status(201).json({
      model: task,
      message: "objet créé!",
    });
  } catch {
    res.status(400).json({
      error: Error.message,
      message: "Données invalides!",
    });
  }
};

const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  try {
    (task) => {
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
    };
  } catch {
    res.status(400).json({
      error: Error.message,
      message: "Données invalides!",
    });
  }
};

const deleteTask = async (req, res) => {
  // console.log(req.params.id);
  // res.send(req.body);*
  await Task.delete({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "success!",
    });
  } catch {
    res.status(400).json({
      error: Error.message,
    });
  }
};
0;

module.exports = { deleteTask, updateTask, addTask, getTaskById, getAllTasks };
