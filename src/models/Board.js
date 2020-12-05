const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cover: { type: File },
  private: { type: Boolean, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  admins: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creado: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Board", BoardSchema);
