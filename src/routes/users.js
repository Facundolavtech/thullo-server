const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Insert a valid email").isEmail(),
    check("password", "Password must have been at least 6 characters").isLength(
      {
        min: 6,
      }
    ),
  ],
  userController.createUser
);

module.exports = router;
