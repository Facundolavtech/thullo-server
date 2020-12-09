const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  description: { type: String },
  members: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creado: { type: Date, default: Date.now() },
  tags: { type: Array },
  attachments: { type: FileList },
  comments: { type: Array },
});

module.exports = mongoose.model("Task", TaskSchema);
