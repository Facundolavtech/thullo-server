const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const boardController = require("../controllers/boardController");
const auth = require("../middlewares/auth");

router.get("/", auth, boardController.getBoards);

router.post(
  "/",
  auth,
  [check("name", "Name is required").not().isEmpty()],
  boardController.createBoard
);

router.put("/:id", auth, boardController.updateBoard);

router.delete("/:id", auth, boardController.deleteBoard);

module.exports = router;
