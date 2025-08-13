const jwt = require('jsonwebtoken');
const UsersModel = require("../models/users.model");
const JWT_SECRET = "SecretKey123456789";

exports.registration = async (req, res) => {
  try {
    const { email, password, firstName, lastName, mobile, photo } = req.body;

    if (!email || !password || !firstName || !lastName || !mobile) {
      return res.status(400).json({ status: "fail", data: "All fields are required." });
    }

    const userExists = await UsersModel.findOne({ email });
    if (userExists) return res.status(400).json({ status: "fail", data: "Email already exists." });

    const data = await UsersModel.create({ email, password, firstName, lastName, mobile, photo });
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "fail", data: err.message || err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: "fail", data: "Email and password are required." });

    const user = await UsersModel.findOne({ email });
    if (!user || user.password !== password) return res.status(401).json({ status: "fail", data: "Invalid credentials." });

    const token = jwt.sign({ data: email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ status: "success", data: { token, user } });
  } catch (err) {
    res.status(500).json({ status: "fail", data: "Internal server error" });
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    const email = req.user.email;
    const updated = await UsersModel.updateOne({ email }, req.body);
    res.status(200).json({ status: "success", data: updated });
  } catch (err) {
    res.status(500).json({ status: "fail", data: "Internal server error" });
  }
};
