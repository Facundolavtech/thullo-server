const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const boardController = require("../controllers/boardController");
const auth = require("../middlewares/auth");
const changeBoard = require("../middlewares/changeBoard");
const deleteBoard = require("../middlewares/deleteBoard");

router.get("/", auth, boardController.getBoards);

router.post(
  "/",
  auth,
  [check("name", "Name is required").not().isEmpty()],
  boardController.createBoard
);

router.put("/:id", auth, changeBoard, boardController.updateBoard);

router.delete("/:id", auth, deleteBoard, boardController.deleteBoard);

module.exports = router;
