const jwt = require('jsonwebtoken');
const UsersModel = require("../models/users.model");
const JWT_SECRET = "SecretKey123456789";

exports.registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "fail", data: "Email and password are required." });
    }
    const data = await UsersModel.create(req.body);
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message || err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "fail", data: "Email and password are required." });
    }
    const user = await UsersModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ status: "fail", data: "Invalid email or password." });
    }
    const token = jwt.sign({ data: email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: "success", data: { token, user } });
  } catch (error) {
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers['email'];
    let reqBody = req.body;

    const data = await UsersModel.updateMany({ email }, reqBody);

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
