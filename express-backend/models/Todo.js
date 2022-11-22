const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String, default: new Date(Date.now()).toLocaleString() },
  complete: { type: Boolean, required: false },
  dateCompleted: { type: String, required: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
