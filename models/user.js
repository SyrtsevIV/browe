const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^[A-Z]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  phoneNumber: String,
  createAt: { type: Date, default: new Date() },
  events: Array,
});

module.exports = mongoose.model('User', userSchema);
