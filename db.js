const mongoose = require("mongoose");
const mongooseURI = "mongodb://127.0.0.1:27017/movie-app";

const connectToMongo = async () => {
  if (await mongoose.connect(mongooseURI)) {
    return true;
  } else {
    return false;
  }
};

module.exports = connectToMongo;
