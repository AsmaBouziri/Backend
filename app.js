const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task");
const taskasyncRoutes = require("./routes/taskascyn");
const authRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const authorRoutes = require("./routes/author");
const categoryRoutes = require("./routes/category");

mongoose
  .connect("mongodb://127.0.0.1:27017/ToDo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!", e));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Heders",
    "Origin,X-Requsted-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/api/tasks", taskRoutes);
app.use("/api/tasksasync", taskasyncRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/auteur", authorRoutes);
app.use("/api/category", categoryRoutes);


module.exports = app;
