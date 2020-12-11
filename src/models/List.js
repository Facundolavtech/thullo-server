const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  creado: { type: Date, default: Date.now() },
  tasks: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      tags: Array,
      members: { type: Array, ref: "User" },
      creado: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model("List", ListSchema);
