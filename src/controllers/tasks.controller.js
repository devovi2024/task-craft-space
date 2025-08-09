const TaskModel = require("../models/tasks.model")


exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email'];

    TaskModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "success", data: data });
        }
    });
};
