const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  residentName: String,
  email: String,
  apartment: String,
  amount: Number,
  month: String,
  paymentDate: Date
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);