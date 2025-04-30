const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  eventDate: { type: Date, required: true },
  eventTime: String,
  location: String,
  organizedBy: String,
  contactInfo: String,
  eventType: String,
  registrationRequired: { type: Boolean, default: false },
  maxParticipants: { type: Number, default: null },
  posterImage: String, // You can use a URL or file name
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
