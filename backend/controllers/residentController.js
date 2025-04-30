const Resident = require("../models/Resident");

// Add Resident with Image Upload
exports.addResident = async (req, res) => {
  try {
    const { name, email, phone, password, apartment } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newResident = new Resident({ name, email, phone, apartment, password, image });
    await newResident.save();
    res.status(201).json({ message: "Resident added successfully!", newResident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Resident with Image Upload
exports.updateResident = async (req, res) => {
  try {
    const { name, email, phone, password, apartment } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if no new file uploaded

    await Resident.findByIdAndUpdate(req.params.id, { name, email, phone, apartment, password, image });
    res.json({ message: "Resident updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
