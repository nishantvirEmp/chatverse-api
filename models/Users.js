const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String
  },
  avatar: {
    type: String
  },
  coverImage: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    //required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UsersSchema);
