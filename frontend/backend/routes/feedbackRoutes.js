// const express = require('express');
// const router = express.Router();
// const feedbackController = require('../controllers/feedbackController');

// router.post('/submit-feedback', feedbackController.submitFeedback);

// module.exports = router;
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/submit-feedback', feedbackController.submitFeedback);
router.get('/', feedbackController.getAllFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
