const express = require("express");

const router = express.Router();
const UserMessages = require("../models/UserMessagesModel");
const { query, body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Nishant@is$awesome";

// ROUTE 1: Create a user using : POST "api/auth/create-user". Doesn't require auth
router.post(
  "/create",
  // Validation setup for req.body
  [body("text", "text can not be blank").exists()],
  fetchUser,
  async (req, res) => {
    // inbuilt validation method to validate the values and returning the errors
    const errors = validationResult(req);

    // check if there are errors and send back them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Create the post
      UserMessages.create(req.body)
        .then((response) => {
          res.status(200).json({ message: "Created successfully" });
        })
        .catch((error) => {
          res
            .status(502)
            .json({ message: "Some error occured while saving the data." });
        });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "some error occurred" });
    }
  }
);

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-msg/:id", fetchUser, async (req, res) => {
  try {
    // get user message
    const data = await UserMessages.findById(req.params.id);
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-msg-by-user/:id", fetchUser, async (req, res) => {
  try {
    // get user message
    let data1 = await UserMessages.find({
      "meta.sender": req.params.id,
    });
    // let data2 = await UserMessages.find({
    //   "meta.receiver": req.params.id,
    // });

    // data1 = [...data1, { data2 }];
    return res.status(200).json({
      data: data1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/fetch-all", fetchUser, async (req, res) => {
  try {
    // get user message
    const data = await UserMessage.find();
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

module.exports = router;
