const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  residentName: String,
  apartmentNumber: String,
  complaint: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
