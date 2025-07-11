const mongoose = require('mongoose');

const rejectedParkingRequestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  apartment: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'rejected' }
});

module.exports = mongoose.model('RejectedParkingRequest', rejectedParkingRequestSchema);
