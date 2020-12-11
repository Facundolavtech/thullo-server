const List = require("../models/List");
const Board = require("../models/Board");
const { validationResult } = require("express-validator");

exports.getLists = async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);

    res.status(200).json(board.lists);
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

exports.createList = async (req, res) => {
  //Check if !errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const boardId = req.params.id;
  try {
    const newList = await new List(req.body);

    newList.board = boardId;

    await Board.findByIdAndUpdate(boardId, {
      $push: { lists: { id: newList._id, name: newList.name } },
    });

    await newList.save();

    res.status(200).json({ msg: "List created succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

exports.updateList = async (req, res) => {
  const boardId = req.params.id;
  const listId = req.params.listId;
  try {
    await List.findByIdAndUpdate(listId, req.body);

    if (req.body.name) {
      Board.findOneAndUpdate(
        {
          _id: boardId,
          "lists.id": listId,
        },
        {
          $set: {
            "lists.$.name": req.body.name,
          },
        },
        function (error, success) {
          if (error) console.log(error);
        }
      );
    }

    res.status(200).json({ msg: "List updated succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};

exports.deleteList = async (req, res) => {
  const boardId = req.params.id;
  const listId = req.params.listId;

  try {
    await List.findByIdAndDelete(listId);

    Board.update({ _id: boardId }, { $pull: { lists: { id: listId } } }).then(
      () => {
        null;
      }
    );
    res.status(200).json({ msg: "List deleted succesfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error was ocurred" });
  }
};
