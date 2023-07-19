const connectToMongo = require("./db");

const express = require("express");

const app = express();
const port = 5000; // the port number where app will run

connectToMongo()
  .then((response) => {
    console.log("connection status", response);
  })
  .catch(() => {
    console.log("connection error");
  });

app.listen(port, () => {
  console.log("app is running");
});

// Middleware: to accept the Json format, otherwise Json data will not handled on the request body
app.use(express.json());

// Routes calls
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/userMessages", require("./routes/userMessages"));
