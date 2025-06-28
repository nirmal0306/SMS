// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const Visitor = require("../models/Visitor");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');
// const router = express.Router();

// const VisitorPurpose = require('../models/VisitorPurpose');

// // Ensure uploads folder exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Set up storage for uploaded images
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/"); // Store files in "uploads" folder
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
// //   },
// // });


// // Set up multer storage for the uploaded photo
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Store images in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + path.extname(file.originalname); // Unique name for the image
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage });

// // Visitor Login Route
// router.post('/visitorLogin', upload.single('image'), [
//   // Validate email and password
//   check('email').isEmail().withMessage('Enter a valid email'),
//   check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   try {
//     // Find visitor by email in the database
//     const visitor = await Visitor.findOne({ email });
//     if (!visitor) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, visitor.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // If photo is uploaded, update visitor's image path
//     if (req.file) {
//       visitor.image = req.file.path;
//       await visitor.save(); // Save the updated visitor record with the new image
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: visitor._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.json({
//       token,
//       message: 'Login successful',
//       visitor: {
//         name: visitor.name,
//         email: visitor.email,
//         image: visitor.image,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // ✅ Create Visitor (With Image Upload)
// router.post("/add", upload.single("image"), async (req, res) => {
//   console.log(req.file); // Debugging

//   try {
//     const { name, email, phone, apartment } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

//     const newVisitor = new Visitor({ name, email, phone, apartment, image: imagePath });
//     await newVisitor.save();

//     res.status(201).json({ message: "Visitor added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get All Visitors
// router.get("/list", async (req, res) => {
//   try {
//     const visitors = await Visitor.find();
//     res.json(visitors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Update Visitor (With Image Upload)
// router.put("/update/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, phone, apartment } = req.body;
//     let imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if not updating

//     await Visitor.findByIdAndUpdate(req.params.id, { name, phone, apartment, image: imagePath });
//     res.json({ message: "Visitor updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Delete Visitor
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     await Visitor.findByIdAndDelete(req.params.id);
//     res.json({ message: "Visitor deleted!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/:email', async (req, res) => {
//   try {
//     const visitor = await Visitor.findOne({ email: req.params.email });
//     if (!visitor) return res.status(404).send('Visitor not found');
//     res.json(visitor);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.post('/visitor-purpose', (req, res) => {
//   const { name, purpose, block, flatNo } = req.body;
//   // Save to DB (MongoDB or any DB you're using)
//   console.log('Visitor Purpose:', { name, purpose, block, flatNo });
//   res.status(200).send({ message: 'Purpose recorded successfully' });
// });

// // POST route to save visitor purpose
// router.post('/visitor-purpose', async (req, res) => {
//   try {
//     const { name, purpose, block, flatNo } = req.body;

//     if (!name || !purpose || !block || !flatNo) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const newPurpose = new VisitorPurpose({ name, purpose, block, flatNo });
//     await newPurpose.save();

//     res.status(200).json({ message: 'Purpose submitted successfully' });
//   } catch (error) {
//     console.error('Error saving purpose:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Optional: GET route to view all visitor purposes
// router.get('/visitor-purpose-list', async (req, res) => {
//   try {
//     const purposes = await VisitorPurpose.find().sort({ timestamp: -1 });
//     res.status(200).json(purposes);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });


// module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const path = require('path'); // Import path module
// const Visitor = require("../models/Visitor");
// const { check, validationResult } = require('express-validator');

// // Initialize router
// const router = express.Router();

// // Set up multer storage for the uploaded photo
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Store images in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + path.extname(file.originalname); // Unique name for the image
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage });

// // Visitor Login Route
// router.post('/visitorLogin', upload.single('image'), [
//   // Validate email and password
//   check('email').isEmail().withMessage('Enter a valid email'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email } = req.body;

//   try {
//     // Find visitor by email in the database
//     const visitor = await Visitor.findOne({ email });
//     if (!visitor) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }


//     // If photo is uploaded, update visitor's image path
//     if (req.file) {
//       visitor.image = req.file.path;
//       await visitor.save(); // Save the updated visitor record with the new image
//     }

//     print(req.file)
//     // Generate JWT token
//     const token = jwt.sign({ id: visitor._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.json({
//       token,
//       message: 'Login successful',
//       visitor: {
//         name: visitor.name,
//         email: visitor.email,
//         image: visitor.image,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Create Visitor (With Image Upload)
// router.post("/add", upload.single("image"), async (req, res) => {
//   console.log(req.file); // Debugging

//   try {
//     const { name, email, phone, apartment } = req.body;
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

//     const newVisitor = new Visitor({ name, email, phone, apartment, image: imagePath });
//     await newVisitor.save();

//     res.status(201).json({ message: "Visitor added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get All Visitors
// router.get("/list", async (req, res) => {
//   try {
//     const visitors = await Visitor.find();
//     res.json(visitors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Update Visitor (With Image Upload)
// router.put("/update/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, phone, apartment } = req.body;
//     let imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep old image if not updating

//     await Visitor.findByIdAndUpdate(req.params.id, { name, phone, apartment, image: imagePath });
//     res.json({ message: "Visitor updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Delete Visitor
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     await Visitor.findByIdAndDelete(req.params.id);
//     res.json({ message: "Visitor deleted!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get Visitor by Email
// router.get('/:email', async (req, res) => {
//   try {
//     const visitor = await Visitor.findOne({ email: req.params.email });
//     if (!visitor) return res.status(404).send('Visitor not found');
//     res.json(visitor);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const Visitor = require("../models/Visitor");
const faceapi = require('face-api.js');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads/
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({ storage });


// ✅ Add Visitor (Prevent duplicates)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, email, phone, apartment } = req.body;

    // Check if email already exists
    const existing = await Visitor.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Visitor already exists with this email" });
    }

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


// ✅ Get Visitor by ID
router.get("/get/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get Visitor by Email
router.get('/email/:email', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.params.email });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Update Visitor (with image)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, apartment } = req.body;
    let imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await Visitor.findByIdAndUpdate(req.params.id, {
      name,
      phone,
      apartment,
      image: imagePath,
    });

    if (!updated) return res.status(404).json({ message: "Visitor not found" });

    res.json({ message: "Visitor updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Delete Visitor
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Visitor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Visitor not found" });

    res.json({ message: "Visitor deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Visitor Login
// router.post('/visitorLogin', upload.single('image'), [
//   check('email').isEmail().withMessage('Enter a valid email'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { email } = req.body;

//   try {
//     const visitor = await Visitor.findOne({ email });
//     if (!visitor) {
//       return res.status(401).json({ message: 'Invalid email' });
//     }

//     // If new image uploaded, update
//     if (req.file) {
//       visitor.image = `/uploads/${req.file.filename}`;
//       await visitor.save();
//     }

//     console.log(req.file); // fixed: print -> console.log

//     const token = jwt.sign({ id: visitor._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.json({
//       token,
//       message: 'Login successful',
//       visitor: {
//         name: visitor.name,
//         email: visitor.email,
//         image: visitor.image,
//         phone: visitor.phone,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Visitor Login route
// router.post('/visitorLogin', upload.single('image'), [
//   check('email').isEmail().withMessage('Enter a valid email'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { email } = req.body;

//   try {
//     const visitor = await Visitor.findOne({ email });
//     if (!visitor) {
//       return res.status(401).json({ message: 'Invalid email' });
//     }

//     // If new image uploaded, update
//     if (req.file) {
//       visitor.image = `/uploads/${req.file.filename}`;
//       await visitor.save();
//     }

//     const token = jwt.sign({ id: visitor._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.json({
//       token,
//       message: 'Login successful',
//       visitor: {
//         name: visitor.name,
//         email: visitor.email,
//         image: visitor.image,
//         phone: visitor.phone,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Load face-api.js models (same as frontend)
async function loadModels() {
  const MODEL_URL = path.join(__dirname, 'models');
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
  ]);
}

// Visitor Login with image comparison

// router.post('/visitorLogin', upload.single('image'), [
//   check('email').isEmail().withMessage('Enter a valid email'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { email } = req.body;

//   try {
//     const visitor = await Visitor.findOne({ email });
//     if (!visitor) {
//       return res.status(401).json({ message: 'Invalid email' });
//     }

//     // Load the models
//     await loadModels();

//     // If image is uploaded, compare it with stored image
//     if (req.file) {
//       const capturedImage = await faceapi.bufferToImage(req.file.buffer);
//       const storedImagePath = path.join(__dirname, `../uploads/${visitor.image}`);
//       const storedImage = await faceapi.bufferToImage(fs.readFileSync(storedImagePath));

//       // Detect faces and compare the images
//       const capturedDescriptor = await faceapi.detectSingleFace(capturedImage).withFaceDescriptor();
//       const storedDescriptor = await faceapi.detectSingleFace(storedImage).withFaceDescriptor();

//       if (capturedDescriptor && storedDescriptor) {
//         const distance = faceapi.euclideanDistance(capturedDescriptor.descriptor, storedDescriptor.descriptor);
//         if (distance < 0.6) { // Threshold value for comparison
//           // Image match successful, return the token
//           const token = jwt.sign({ id: visitor._id }, 'your-secret-key', { expiresIn: '1h' });
//           return res.json({
//             token,
//             message: 'Login successful',
//             visitor: {
//               name: visitor.name,
//               email: visitor.email,
//               image: visitor.image,
//               phone: visitor.phone,
//             },
//           });
//         } else {
//           return res.status(401).json({ message: 'Face not recognized.' });
//         }
//       }
//     }

//     // If no new image is uploaded, or face recognition failed
//     res.status(400).json({ message: 'Face recognition failed.' });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/visitorLogin', upload.single('image'), async (req, res) => {
  const { email } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const visitor = await Visitor.findOne({ email });
    if (!visitor) {
      return res.status(401).json({ message: 'Visitor not found' });
    }

    const savedImagePath = path.join(__dirname, '../', 'uploads', visitor.image);
    const uploadedImage = await faceapi.fetchImage(file.path);
    const storedImage = await faceapi.fetchImage(savedImagePath);

    const uploadedDetection = await faceapi.detectSingleFace(uploadedImage).withFaceDescriptor();
    const storedDetection = await faceapi.detectSingleFace(storedImage).withFaceDescriptor();

    if (!uploadedDetection || !storedDetection) {
      return res.status(400).json({ message: 'Face detection failed' });
    }

    const distance = faceapi.euclideanDistance(uploadedDetection.descriptor, storedDetection.descriptor);
    if (distance < 0.6) {
      const token = jwt.sign({ id: visitor._id }, 'your-secret-key');
      return res.json({ message: 'Login successful', token });
    } else {
      return res.status(400).json({ message: 'Image mismatch, login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing login' });
  }
});

module.exports = router;
