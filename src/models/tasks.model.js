const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pending" },
  email: { type: String, required: true },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const TasksModel = mongoose.model("tasks", DataSchema);
module.exports = TasksModel;
