const mongoose = require("mongoose");
const mongooseURI = "mongodb+srv://dev-chatvers:uK4vvWEr4CEGfC5j@cluster0.hb5zrlx.mongodb.net/dev-chatverse";

const connectToMongo = async () => {
  if (await mongoose.connect(mongooseURI)) {
    return true;
  } else {
    return false;
  }
};

module.exports = connectToMongo;
