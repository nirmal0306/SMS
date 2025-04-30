const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });


// Existing routes
router.put('/:id', upload.single('posterImage'), eventController.updateEvent);

// Routes
router.post('/', upload.single('posterImage'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
// router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;


// Routes
// router.post('/', eventController.createEvent);
// router.get('/', eventController.getAllEvents);
// router.get('/:id', eventController.getEventById);
// router.put('/:id', eventController.updateEvent);
// router.delete('/:id', eventController.deleteEvent);

// module.exports = router;

