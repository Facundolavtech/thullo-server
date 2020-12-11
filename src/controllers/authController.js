const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Check if user has registered
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "User not registered" });
    }

    //Check if password match with hash password

    const matchPasswords = await bcrypt.compare(password, user.password);

    if (!matchPasswords) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    //Create JWT

    const payload = {
      user: user.id,
      username: user.username,
      name: user.name
    };

    //Sign JWT

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: 2592000, //1 Month - 30 Days
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ msg: "Login succesfully", token });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

//Obtain the authenticated user
exports.userAuthenticated = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "An error was ocurred" });
  }
};
