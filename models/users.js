const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sub: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bio: { type: String, default: null },
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;

