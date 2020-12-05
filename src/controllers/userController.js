const User = require("../models/User.js");

exports.createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  await newUser.save();
  res.status(200).json({ msg: "Usuario creado con exito" });
};
