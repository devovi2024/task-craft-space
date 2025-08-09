const TaskModel = require("../models/tasks.model");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const reqBody = { ...req.body, email: req.headers["email"] };
    const task = await TaskModel.create(reqBody);
    res.status(201).json({ status: "success", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const result = await TaskModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "success", message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// Update Task Status
exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const result = await TaskModel.updateOne(
      { _id: id },
      { $set: { status } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "success", message: "Status updated" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};
