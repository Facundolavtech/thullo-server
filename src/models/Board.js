const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  private: { type: Boolean, required: true },
  description: { type: String },
  creator: [
    {
      id: mongoose.Schema.Types.ObjectId,
      username: String,
      name: String,
    },
  ],
  admins: [
    {
      id: mongoose.Schema.Types.ObjectId,
      username: String,
      name: String,
    },
  ],
  users: [
    { id: mongoose.Schema.Types.ObjectId, username: String, name: String },
  ],
  creado: { type: Date, default: Date.now() },
  lists: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
      name: String,
    },
  ],
});

module.exports = mongoose.model("Board", BoardSchema);
