const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  about: {
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
  status: {
    type: Boolean
  },
  channels: {
    type: Array
  },
  isFavourite: {
    type: Boolean
  },
  wa_id: {
    type: String,
  },
  media: {
    type: Object,
  },
  attachedFiles: {
    type: Object,
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

module.exports = mongoose.model("contacts", ContactsSchema);
