const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  photo: { type: String, default: "" },
  createDate: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('users', UserSchema);
