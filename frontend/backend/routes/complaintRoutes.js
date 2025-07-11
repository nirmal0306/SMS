const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/submit-complaint', complaintController.submitComplaint);

// Get all complaints
router.get('/', complaintController.getAllComplaints);

// Resolve complaint
router.put('/:id/resolve', complaintController.resolveComplaint);

// Delete complaint
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
