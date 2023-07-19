const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserMessagesSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  meta: {
    type: Object,
  },
  time: {
    type: Date,
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

module.exports = mongoose.model("userMessages", UserMessagesSchema);
