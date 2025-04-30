const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Visitor = require("../models/Visitor");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Create Visitor (With Image Upload)
router.post("/add", upload.single("image"), async (req, res) => {
  console.log(req.file); // Debugging

  try {
    const { name, email, phone, apartment } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newVisitor = new Visitor({ name, email, phone, apartment, image: imagePath });
    await newVisitor.save();

    res.status(201).json({ message: "Visitor added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Visitors
router.get("/list", async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Visitor (With Image Upload)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, apartment } = req.body;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if not updating

    await Visitor.findByIdAndUpdate(req.params.id, { name, phone, apartment, image: imagePath });
    res.json({ message: "Visitor updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Visitor
router.delete("/delete/:id", async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
    res.json({ message: "Visitor deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.params.email });
    if (!visitor) return res.status(404).send('Visitor not found');
    res.json(visitor);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
