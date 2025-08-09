const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

const UsersModel = mongoose.model('users', UserSchema);

module.exports = UsersModel;
