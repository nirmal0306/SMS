const mongoose = require('mongoose');

const approvedParkingRequestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  apartment: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'approved' },
  parkingNumber: { type: String, required: true }
});

module.exports = mongoose.model('ApprovedParkingRequest', approvedParkingRequestSchema);
