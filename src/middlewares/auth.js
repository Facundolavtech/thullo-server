const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Learn Token
  const token = req.header("x-auth-token");

  //Check if token doesnt exists
  if (!token) {
    res.status(401).json({ msg: "Invalid token, you dont have permission" });
  }

  //Validate token

  try {
    const hashToken = jwt.verify(token, process.env.SECRETKEY);
    req.user = hashToken.user;
    req.username = hashToken.username;
    req.name = hashToken.name;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unvalid token" });
  }
};
