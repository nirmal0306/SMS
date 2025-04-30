const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  image: { type: String }, // Store image path
});

module.exports = mongoose.model("Visitor", visitorSchema);