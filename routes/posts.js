const express = require("express");

const router = express.Router();
const Posts = require("../models/Posts");
const { query, body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Nishant@is$awesome";

// ROUTE 1: Create a user using : POST "api/auth/create-user". Doesn't require auth
router.post(
  "/create-post",
  // Validation setup for req.body
  [
    body("title", "title should be at least 3 characters").isLength({ min: 3 }),
    body("slug", "slug should be at least 3 characters").isLength({ min: 3 }),
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
      // Check if email already exists
      let post = await Posts.findOne({ slug: req.body.slug });
      if (post) {
        return res.status(400).json({ errors: "post already exist" });
      } else {

        // Create the post
        Posts.create(req.body)
          .then((response) => {
            res.status(200).json({ "message": "Created successfully" });
          })
          .catch((error) => {
            res
              .status(502)
              .json({ message: "Some error occured while saving the data." });
          });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "some error occurred" });
    }
  }
);

/*
// ROUTE 2: Authenticate a user using : POST "api/auth/login". Doesn't require auth
router.post(
  "/login",
  // Validation setup for req.body
  [
    body("email", "Email is not valid").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    // inbuilt validation method to validate the values and returning the errors
    const errors = validationResult(req);

    // check if there are errors and send back them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Invalid credentials, please try again" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Invalid credentials, please try again" });
      }

      const data = {
        user: user.id,
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.status(200).json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "some error occurred" });
    }
  }
);

// ROUTE 3: Get a user using : GET "api/auth/user-details". require auth
router.get("/user-details",fetchUser, async (req, res) => {
  try {
    let userId = req.user;
    let user = await Users.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ errors: "User not found" });
    }
    return res.status(200).json({
      userData: user
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});
*/

module.exports = router;
