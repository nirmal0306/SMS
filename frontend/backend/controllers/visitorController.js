const Visitor = require("../models/Visitor");

// Add Visitor with Image Upload
exports.addVisitor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newVisitor = new Visitor({ name, email, phone, image });
    await newVisitor.save();
    res.status(201).json({ message: "Visitor added successfully!", newVisitor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
