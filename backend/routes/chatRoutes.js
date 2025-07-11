// const express = require('express');
// const router = express.Router();
// const Visitor = require('../models/Visitor');
// const Complaint = require('../models/Complaint');
// const Maintenance = require('../models/Maintenance');
// const Resident= require('../models/Resident');
// const Event = require('../models/Event');

// router.post('/chatbot', async (req, res) => {
//   const message = req.body.message.toLowerCase();
//   let reply = "Sorry, I didn’t understand that.";

//   try {
//     if (message.includes('visitors')) {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       const count = await Visitor.countDocuments({ date: { $gte: today } });
//       reply = `There have been ${count} visitors today.`;
//     } 
//     else if (message.includes('complaint') && message.includes('pending')) {
//       const complaints = await Complaint.find({ status: 'Pending' });
//       reply = `There are ${complaints.length} pending complaints.`;
//     } 
//     else if (message.includes('maintenance')) {
//       const dues = await Maintenance.find({ status: 'Unpaid' });
//       reply = `There are ${dues.length} unpaid maintenance records.`;
//     } 
//     else if (message.includes('event') || message.includes('upcoming')) {
//       const today = new Date();
//       const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
//       reply = events.length
//         ? `Upcoming event: ${events[0].title} on ${events[0].date.toDateString()}`
//         : `There are no upcoming events.`;
//     }
//   } catch (err) {
//     reply = "There was an error fetching data.";
//     console.error(err);
//   }

//   res.json({ reply });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const Complaint = require('../models/Complaint');
const Maintenance = require('../models/Maintenance');
const Resident = require('../models/Resident');
const Event = require('../models/Event');
const Feedback = require('../models/Feedback');
const Notice = require('../models/Notice');
const Parking = require('../models/ParkingRequest');
const jwt = require('jsonwebtoken');

// Chatbot basic response logic
router.post('/chatbot', async (req, res) => {
  const message = req.body.message.toLowerCase();
  let reply = "Sorry, I didn’t understand that.";

  try {
    if (message.includes('visitors')) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const count = await Visitor.countDocuments({ date: { $gte: today } });
      reply = `There have been ${count} visitors today.`;
    } else if (message.includes('complaint') && message.includes('pending')) {
      const complaints = await Complaint.find({ status: 'Pending' });
      reply = `There are ${complaints.length} pending complaints.`;
    } else if (message.includes('maintenance')) {
      const dues = await Maintenance.find({ status: 'Unpaid' });
      reply = `There are ${dues.length} unpaid maintenance records.`;
    } else if (message.includes('event') || message.includes('upcoming')) {
      const today = new Date();
      const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
      reply = events.length
        ? `Upcoming event: ${events[0].title} on ${events[0].date.toDateString()}`
        : `There are no upcoming events.`;
    }
  } catch (err) {
    console.error(err);
    reply = "There was an error fetching data.";
  }

  res.json({ reply });
});

// Maintenance for a specific email
router.get('/maintenance/:email', async (req, res) => {
  try {
    const records = await Maintenance.find({ email: req.params.email });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch maintenance data' });
  }
});

// Visitor info
router.get('/visitor/:email', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.params.email });
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ error: 'Visitor not found' });
  }
});

// Visitor purpose
router.get('/visitorpurpose/:email', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.params.email }, 'purpose');
    res.json(visitor || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purpose' });
  }
});

// Complaints
router.get('/complaints/:email', async (req, res) => {
  try {
    const complaints = await Complaint.find({ email: req.params.email });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching complaints' });
  }
});

// Feedbacks
router.get('/feedbacks/:email', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ email: req.params.email });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedbacks' });
  }
});

// Events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Notices
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notices' });
  }
});

// Parking request
router.get('/parking/:email', async (req, res) => {
  try {
    const requests = await Parking.find({ email: req.params.email });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching parking requests' });
  }
});

// Resident
router.get('/resident/:email', async (req, res) => {
  try {
    const resident = await Resident.findOne({ email: req.params.email });
    res.json(resident);
  } catch (err) {
    res.status(500).json({ error: 'Resident not found' });
  }
});

// Get logged-in user (using JWT)
router.get('/getUser', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const userEmail = req.headers['x-user-email'];

    if (!token || !userEmail) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== userEmail) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await Resident.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ email: user.email, username: user.name });
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
