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
    [
      body("text", "text can not be blank").exists(),
    ],
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
              res.status(200).json({ "message": "Created successfully" });
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