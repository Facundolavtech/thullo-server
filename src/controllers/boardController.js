const Board = require("../models/Board");
const { validationResult } = require("express-validator");

exports.getBoards = async (req, res) => {
  const id = req.user;
  try {
    const boards = await Board.find({
      "users.id": id,
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

exports.createBoard = async (req, res) => {
  //Check if !errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const board = await new Board(req.body);

    //Set board creator
    board.creator.push({
      id: req.user,
      username: req.username,
      name: req.name,
    });

    board.admins.push({
      id: req.user,
      username: req.username,
      name: req.name,
    });

    board.users.push({
      id: req.user,
      username: req.username,
      name: req.name,
    });

    board.save();

    res.status(200).json({ msg: "Board created succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "And error as ocurred" });
  }
};

exports.updateBoard = async (req, res) => {
  const id = req.params.id;
  try {
    await Board.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Board updated succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

exports.deleteBoard = async (req, res) => {
  const id = req.params.id;

  try {
    await Board.findByIdAndDelete(id);
    res.status(200).json({ msg: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};
