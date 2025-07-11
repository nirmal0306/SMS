// const Feedback = require('../models/Feedback');

// exports.submitFeedback = async (req, res) => {
//   try {
//     const newFeedback = new Feedback(req.body);
//     await newFeedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error submitting feedback' });
//   }
// };

const Feedback = require('../models/Feedback');

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};
