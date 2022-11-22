const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const router = express.Router();

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      console.log("req.header('Authorization'): ", req.header("Authorization"));
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized." });
  }
  next();
});

router.post("/", async function (req, res, next) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
    dateCompleted: req.body.dateCompleted,
  });
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        complete: savedTodo.complete,
        dateCompleted: savedTodo.dateCompleted,
      });
    })
    .catch((error) => {
      console.log("**ERROR: " + error.message);
      return res
        .status(500)
        .json({ error: "Something went wrong creating the todo." });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res, next) {
  const deleted = await Todo.findByIdAndDelete(req.body.id);
  return res.status(200).json({ deleted });
});

router.patch("/:id", async function (req, res, next) {
  const toggled = await Todo.findByIdAndUpdate(
    req.body.id,
    {
      complete: req.body.complete,
      dateCompleted: req.body.dateCompleted,
    },
    { new: true }
  );
  return res.status(200).json({ toggled });
});

module.exports = router;
