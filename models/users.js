// models/Users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bio: String,
  imageUrl: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }]
});

module.exports = mongoose.model('Users', userSchema);
