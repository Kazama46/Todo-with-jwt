const router = require("express").Router();
const Todo = require("../models/Todo");

// routes will be here....
router.get("/", async (req, res) => {
  const allTodo = await Todo.find();
  res.status(200).send(allTodo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Invalid id");
  }
  const todo = await Todo.findById(id);
  res.status(200).send(todo);
});

router.post("/add/todo", async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).send("Invalid todo");
  }
  const newTodo = new Todo({ todo });

  newTodo.save((err, todo) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(todo);
  });
});

router.put("/update/todo/:id", async (req, res) => {
  const { todo } = req.body;
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Invalid id");
    }
    if (!todo) {
      res.status(400).send("Invalid todo");
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/delete/todo/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Invalid id");
  }
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(todo);
    }
  });
});

module.exports = router;
