const Board = require("../models/Board");

module.exports = async function (req, res, next) {
  try {
    const board = Board.find({ _id: req.params.id });

    let isUser = 0;

    const user = await board
      .find({ "users.id": req.user })
      .countDocuments((err, count) => {
        if (err) throw err;
        isUser = count;
      });

    if (isUser === 1) {
      next();
    } else {
      res.status(400).json({ msg: "You dont have permission to do this" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An error has ocurred" });
  }
};
