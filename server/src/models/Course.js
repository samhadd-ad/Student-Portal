const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },         // e.g. EECS 3451
    name: { type: String, required: true },         // Signals and Systems
    instructor: { type: String },
    semester: { type: String },                     // e.g. Winter 2025
    color: { type: String }                         // optional for UI
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
