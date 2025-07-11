const Complaint = require('../models/Complaint');

exports.submitComplaint = async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint' });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

// Mark complaint as resolved
exports.resolveComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, { status: 'Resolved' });
    res.json({ message: 'Complaint resolved' });
  } catch (error) {
    res.status(500).json({ message: 'Error resolving complaint', error });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};