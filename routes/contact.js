const express = require("express");

const router = express.Router();
const UserMessages = require("../models/UserMessagesModel");
const Contacts = require("../models/Contacts");
const { query, body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Create a user using : POST "api/auth/create-user". Doesn't require auth
router.post(
  "/create-contact",
  // Validation setup for req.body
  [
    body("email", "Email is not valid").isEmail(),
    body("firstName", "First name should be at least 3 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    // inbuilt validation method to validate the values and returning the errors
    const errors = validationResult(req);

    // check if there are errors and send back them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already exists
      let user = await Contacts.findOne({ email: req.body.email });

      //return res.status(400).json({ users: user });
      if (user) {
        return res.status(400).json({ errors: "email already exist" });
      } else {
        // User Object
        const userObj = {
          firstName: req.body.firstName ?? "",
          lastName: req.body.lastName ?? "",
          about: req.body.about ?? "",
          email: req.body.email ?? "",
          location: req.body.location ?? "",
          status: req.body.status ?? "",
          channels: req.body.channels ?? "",
          isFavourite: req.body.isFavourite ?? "",
          wa_id: req.body.wa_id ?? "0001",
          media: req.body.media ?? "0001",
          attachedFiles: req.body.attachedFiles ?? "0001",
        };

        // Create the contact
        Contacts.create(userObj)
          .then((response) => {
            res.status(200).json({ message: "created successfully." });
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

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-by-id/:id", fetchUser, async (req, res) => {
  try {
    // get user message
    let contactData = await Contacts.findById(req.params.id);
    let data = {
      id: contactData._id,
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      about: contactData.about,
      email: contactData.email,
      location: contactData.location,
      status: contactData.status,
      channels: contactData.channels,
      isFavourite: contactData.isFavourite,
      media: contactData.media,
      attachedFiles: contactData.attachedFiles,
    };
    //data.id = data._id;
    return res.json({
      data,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-all", fetchUser, async (req, res) => {
  try {
    // get user message
    let contactsData = await Contacts.find({});
    let data = [];

    contactsData.map((contact) => {
      let contactD = {};
      //contactD = contact;
      contactD.id = contact._id;
      contactD.firstName = contact.firstName;
      contactD.lastName = contact.lastName;
      contactD.about = contact.about;
      contactD.email = contact.email;
      contactD.location = contact.location;
      contactD.channels = contact.channels;
      contactD.isFavourite = contact.isFavourite;
      contactD.wa_id = contact.wa_id;
      contactD.media = contact.media;
      contactD.attachedFiles = contact.attachedFiles;
      data.push(contactD);
    });

    return res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-direct-contacts", fetchUser, async (req, res) => {
  try {
    // get user message
    let contactsData = await Contacts.find({ isFavourite: false });
    let data = [];

    contactsData.map((contact) => {
      let contactD = {};
      //contactD = contact;
      contactD.id = contact._id;
      contactD.firstName = contact.firstName;
      contactD.lastName = contact.lastName;
      contactD.about = contact.about;
      contactD.email = contact.email;
      contactD.location = contact.location;
      contactD.channels = contact.channels;
      contactD.isFavourite = contact.isFavourite;
      contactD.wa_id = contact.wa_id;
      contactD.media = contact.media;
      contactD.attachedFiles = contact.attachedFiles;
      data.push(contactD);
    });

    return res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 2: get a user using : GET "api/auth/fetch-user-message/:id". Doesn't require auth
router.get("/get-favourite-contacts", fetchUser, async (req, res) => {
  try {
    // get user message
    let contactsData = await Contacts.find({ isFavourite: true });
    let data = [];

    contactsData.map((contact) => {
      let contactD = {};
      //contactD = contact;
      contactD.id = contact._id;
      contactD.firstName = contact.firstName;
      contactD.lastName = contact.lastName;
      contactD.about = contact.about;
      contactD.email = contact.email;
      contactD.location = contact.location;
      contactD.channels = contact.channels;
      contactD.isFavourite = contact.isFavourite;
      contactD.wa_id = contact.wa_id;
      contactD.media = contact.media;
      contactD.attachedFiles = contact.attachedFiles;
      data.push(contactD);
    });

    return res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

// ROUTE 3: Get a user using : GET "api/auth/user-details". require auth
router.get("/get-contacts-count", async (req, res) => {
  try {
    let users = await Contacts.find({});

    if (!users) {
      return res.status(404).json({ errors: "Contacts not found" });
    }

    return res.status(200).json({
      status: true,
      data: users.length,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "some error occurred" });
  }
});

module.exports = router;
