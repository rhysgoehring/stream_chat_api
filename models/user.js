const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    { _id: this._id, username: this.username, dateCreated: this.dateCreated },
    process.env.JWT_KEY,
  );
  return token;
};

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model("User", UserSchema);

exports.User = User;
