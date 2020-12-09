const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  creado: { type: Date, default: Date.now() },
  tasks: { type: mongoose.Schema.Types.Array, ref: "Task" },
});

module.exports = mongoose.model("List", ListSchema);
