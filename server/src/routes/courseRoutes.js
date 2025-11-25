const express = require("express");
const Course = require("../models/Course");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/courses  (get all courses for logged-in user)
router.get("/", protect, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Get courses error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/courses  (create course)
router.post("/", protect, async (req, res) => {
  try {
    const { code, name, instructor, semester, color } = req.body;
    const course = await Course.create({
      user: req.user._id,
      code,
      name,
      instructor,
      semester,
      color
    });
    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/courses/:id  (update course)
router.put("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Update course error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/courses/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("Delete course error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
