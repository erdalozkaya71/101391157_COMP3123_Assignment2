const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 50 },
});

userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
