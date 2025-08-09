const TasksModel = require("../models/tasks.model");



exports.createTask = async (req, res) => {
  try {
    const reqBody = { ...req.body, email: req.user.email };
    const task = await TasksModel.create(reqBody);
    res.status(201).json({ status: "success", data: task });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};



exports.deleteTask = async (req, res) => {
  try {
    const result = await TasksModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "success", message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};



exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ status: "fail", message: "Invalid status value" });
    }

    const result = await TasksModel.updateOne({ _id: id }, { $set: { status } });

    if (result.matchedCount === 0) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }

    res.status(200).json({ status: "success", message: "Status updated" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};



exports.listTaskByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const email = req.user.email;

    const tasks = await TasksModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createDate: {
            $dateToString: { date: "$createDate", format: "%d-%m-%Y" }
          }
        }
      }
    ]);

    res.status(200).json({ status: "success", data: tasks });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};


exports.tasksStatusByCount = async (req, res) => {
  try {
    const email = req.user.email;

    const aggregationResult = await TasksModel.aggregate([
      { $match: { email: email } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = aggregationResult.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({
      status: "success",
      total: totalTasks,
      byStatus: aggregationResult
    });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};
