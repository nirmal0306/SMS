const Event = require('../models/Event');

// // Create event
// exports.createEvent = async (req, res) => {
//   try {
//     const newEvent = new Event(req.body);
//     const savedEvent = await newEvent.save();
//     res.status(201).json(savedEvent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Create event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      eventDate,
      eventTime,
      location,
      organizedBy,
      contactInfo,
      eventType,
      registrationRequired,
      maxParticipants,
      status,
    } = req.body;

    const posterImage = req.file ? req.file.filename : null;

    const newEvent = new Event({
      title,
      description,
      eventDate,
      eventTime,
      location,
      organizedBy,
      contactInfo,
      eventType,
      registrationRequired,
      maxParticipants,
      status,
      posterImage,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Event Creation Error:', err);
    res.status(500).json({ error: err.message });
  }
};
// Update event
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.posterImage = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Event Update Error:', err);
    res.status(500).json({ error: err.message });
  }
};



// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event
// exports.updateEvent = async (req, res) => {
//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
//     res.status(200).json(updatedEvent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
