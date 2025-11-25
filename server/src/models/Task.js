const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },        // e.g. "HW 3", "Midterm"
    type: { type: String, enum: ["assignment", "exam", "project", "other"], default: "assignment" },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "in_progress", "done"], default: "pending" },
    grade: { type: Number },                        // optional
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
