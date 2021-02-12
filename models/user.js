const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
