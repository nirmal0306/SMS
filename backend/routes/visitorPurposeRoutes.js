const express = require('express');
const router = express.Router();
const VisitorPurpose = require('../models/VisitorPurpose');
const Visitor = require('../models/Visitor');

// POST route to save visitor purpose
router.post('/', async (req, res) => {
  try {
    const { name, email, purpose, block, flatNo } = req.body;

    if (!name || !email || !purpose || !block || !flatNo) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPurpose = new VisitorPurpose({ name, email, purpose, block, flatNo });
    await newPurpose.save();

    res.status(200).json({ message: 'Purpose submitted successfully' });
  } catch (error) {
    console.error('Error saving purpose:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: GET route to view all visitor purposes
router.get('/', async (req, res) => {
  try {
    const purposes = await VisitorPurpose.find().sort({ timestamp: -1 });
    res.status(200).json(purposes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// ✅ GET /visitor-purpose/:email – Get all visitor purposes by email
router.get('/:email', async (req, res) => {
  try {
    const visitorEmail = req.params.email;
    const purposes = await VisitorPurpose.find({ email: visitorEmail }).sort({ timestamp: -1 });

    if (purposes.length === 0) {
      return res.status(404).json({ message: 'No purposes found for this visitor.' });
    }

    res.status(200).json(purposes);
  } catch (error) {
    console.error('Error fetching visitor purposes by email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
