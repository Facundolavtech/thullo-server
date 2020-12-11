const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const listController = require("../controllers/listController");
const auth = require("../middlewares/auth");
const createList = require("../middlewares/createList");

router.get("/:id", auth, createList, listController.getLists);
router.put("/:id/update/:listId", auth, createList, listController.updateList);
router.delete(
  "/:id/delete/:listId",
  auth,
  createList,
  listController.deleteList
);
router.post(
  "/:id",
  auth,
  [
    check("name", "Password must have been at least 6 characters").isLength({
      max: 8,
    }),
    check("name", "Name is required").not().isEmpty(),
  ],
  createList,
  listController.createList
);

module.exports = router;
