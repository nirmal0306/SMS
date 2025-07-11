const express = require('express');
const router = express.Router();
const controller = require('../controllers/parkingController');

router.post('/request', controller.submitRequest);
router.get('/requests', controller.getAllRequests);
router.put('/approve/:id', controller.approveRequest);
router.put('/reject/:id', controller.rejectRequest);
// In parkingRoutes.js
router.get('/accepted', controller.getAcceptedRequests);
router.get('/rejected', controller.getRejectedRequests);
router.get('/accepted/:email', controller.getAcceptedRequestByEmail);
router.get('/rejected/:email', controller.getRejectedRequestByEmail);



module.exports = router;
