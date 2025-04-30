const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const Complaint = require('../models/Complaint');
const Maintenance = require('../models/Maintenance');
const Resident= require('../models/Resident');
const Event = require('../models/Event');

router.post('/chatbot', async (req, res) => {
  const message = req.body.message.toLowerCase();
  let reply = "Sorry, I didn’t understand that.";

  try {
    if (message.includes('visitors')) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const count = await Visitor.countDocuments({ date: { $gte: today } });
      reply = `There have been ${count} visitors today.`;
    } 
    else if (message.includes('complaint') && message.includes('pending')) {
      const complaints = await Complaint.find({ status: 'Pending' });
      reply = `There are ${complaints.length} pending complaints.`;
    } 
    else if (message.includes('maintenance')) {
      const dues = await Maintenance.find({ status: 'Unpaid' });
      reply = `There are ${dues.length} unpaid maintenance records.`;
    } 
    else if (message.includes('event') || message.includes('upcoming')) {
      const today = new Date();
      const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
      reply = events.length
        ? `Upcoming event: ${events[0].title} on ${events[0].date.toDateString()}`
        : `There are no upcoming events.`;
    }
  } catch (err) {
    reply = "There was an error fetching data.";
    console.error(err);
  }

  res.json({ reply });
});

module.exports = router;
