const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("email", "Insert a valid email").isEmail(),
    check("password", "Password must have been at least 6 characters").isLength(
      {
        min: 6,
      }
    ),
  ],
  authController.authUser
);

router.get("/", auth, authController.userAuthenticated);

module.exports = router;
