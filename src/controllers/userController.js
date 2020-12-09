const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  //Check if !errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, username, email, password } = req.body;

  //Verify if user exists
  try {
    let userExists = await User.findOne({ email });
    let usernameExists = await User.findOne({ username });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "An user was registered with this email" });
    }

    if (usernameExists) {
      return res
        .status(400)
        .json({ msg: "An user was registered with this username" });
    }

    let user = new User(req.body);

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Save user
    await user.save();

    res.status(200).json({ msg: "User has succesfully created" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};
