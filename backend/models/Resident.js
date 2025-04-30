const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  apartment: { type: String, required: true },
  image: { type: String }, // Store image path
});

module.exports = mongoose.model("Resident", residentSchema);
