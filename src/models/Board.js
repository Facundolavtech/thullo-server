const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  private: { type: Boolean, required: true },
  description: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  admins: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [{ id: mongoose.Schema.Types.ObjectId, username: String }],
  creado: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Board", BoardSchema);
