const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks?courseId=...
router.get("/", protect, async (req, res) => {
  try {
    const filters = { user: req.user._id };
    if (req.query.courseId) {
      filters.course = req.query.courseId;
    }

    const tasks = await Task.find(filters)
      .populate("course", "code name")
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tasks
router.post("/", protect, async (req, res) => {
  try {
    const { course, title, type, dueDate, status, grade, notes } = req.body;

    const task = await Task.create({
      user: req.user._id,
      course,
      title,
      type,
      dueDate,
      status,
      grade,
      notes
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/tasks/:id
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Update task error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete task error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
