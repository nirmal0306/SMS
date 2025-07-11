const express = require('express');
const router = express.Router();
const VisitorPurpose = require('../models/VisitorPurpose');

// POST route to save visitor purpose
router.post('/', async (req, res) => {
  try {
    const { name, purpose, block, flatNo } = req.body;

    if (!name || !purpose || !block || !flatNo) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPurpose = new VisitorPurpose({ name, purpose, block, flatNo });
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

module.exports = router;
