const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Incorrect username');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
