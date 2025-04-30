const mongoose = require('mongoose');

const parkingRequestSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  apartment: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, approved, rejected
  parkingNumber: { type: String, default: '' }
});

module.exports = mongoose.model('ParkingRequest', parkingRequestSchema);
