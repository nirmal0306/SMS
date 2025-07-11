const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Resident = require("../models/Resident");

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

// ✅ Create Resident (With Image Upload)
router.post("/add", upload.single("image"), async (req, res) => {
  console.log(req.file); // Debugging

  try {
    const { name, email, phone, apartment, password } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newResident = new Resident({ name, email, phone, apartment, password, image: imagePath });
    await newResident.save();

    res.status(201).json({ message: "Resident added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Residents
router.get("/list", async (req, res) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Resident (With Image Upload)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, apartment, password } = req.body;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if not updating

    await Resident.findByIdAndUpdate(req.params.id, { name, phone, apartment, password, image: imagePath });
    res.json({ message: "Resident updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Resident
router.delete("/delete/:id", async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.json({ message: "Resident deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
