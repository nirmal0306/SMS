const mongoose = require('mongoose');

const VisitorPurposeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purpose: { type: String, required: true },
  block: { type: String, required: true },
  flatNo: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VisitorPurpose', VisitorPurposeSchema);
