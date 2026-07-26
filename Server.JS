if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");
const authRoutes = require("./auth");
const requireAuth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB sucessfully!");
  })
  .catch(function (error) {
    console.log("MongoDB connection error:", error);
  });

app.get("/", function (req, res) {
  res.send("Todo server is running!");
});

app.use("/auth", authRoutes);

app.get("/tasks", requireAuth, async function (req, res) {
  try {
    const tasks = await Task.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post("/tasks", requireAuth, async function (req, res) {
  try {
    const newTask = new  Task({
      name: req.body.name,
      date: req.body.date,
      done: false,
      userId: req.userId
    });

    const savedTask = await newTask.save();

    console.log("New task saved:", savedTask.name);
    res.status(201).json(savedTask);

  } catch (error) {
    console.log("Error saving Task:", error);
    res.status(500).json({ message: "Error saving task" });
  }
});

app.patch("/tasks/:id", requireAuth, async function (req, res) {
  try {
    const taskID = req.params.id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID, userId: req.userId },
      { done: req.body.done },
      { returnDocument: "after" }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task updated:", updatedTask.name);
    res.json(updatedTask);

  } catch (error) { 
    console.log("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/tasks/:id", requireAuth, async function (req, res) {
  try {
    const taskID = req.params.id;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskID,
      userId: req.userId
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task deleted:", deletedTask.name);
    res.json({ message: "Task deleted successfully!" });
  } catch (error) {
      console.log("Error deleting task:", error);
      res.status(500).json({ message: "Error deleting task" });
  }
});

app.listen(PORT, function () {
  console.log("Server is running on http://localhost:" + PORT)
});