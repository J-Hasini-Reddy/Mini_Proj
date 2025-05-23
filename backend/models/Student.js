const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  course: { type: String, required: true }
});

module.exports = mongoose.model("Student", StudentSchema);
