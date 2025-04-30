// // // const express = require("express");
// // // const { register, login } = require("../controllers/authController");
// // // const router = express.Router();
// // //
// // // router.post("/register", register);
// // // router.post("/login", login);
// // //
// // // module.exports = router;
// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const dotenv = require("dotenv");

// // dotenv.config();
// // const router = express.Router();

// // // Register Route
// // // router.post("/register", async (req, res) => {
// // //   try {
// // //     const { name, email, password } = req.body;

// // //     let user = await User.findOne({ email });
// // //     if (user) return res.status(400).json({ message: "User already exists" });

// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(password, salt);

// // //     user = new User({ name, email, password: hashedPassword });
// // //     await user.save();

// // //     res.status(201).json({ message: "User registered successfully" });
// // //   } catch (error) {
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // });

// // // // Login Route
// // // router.post("/login", async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     const user = await User.findOne({ email });
// // //     if (!user) return res.status(400).json({ message: "User not found" });

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// // //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// // //     res.json({ token, user: { name: user.name, email: user.email } });
// // //   } catch (error) {
// // //     res.status(500).json({ message: "Server error" });
// // //   }
// // // });



// // // Register Route
// // router.post('/register', async (req, res) => {
// //   const { username, email, password, confirmPassword } = req.body;

// //   // Check if the passwords match
// //   if (password !== confirmPassword) {
// //     return res.status(400).json({ message: 'Passwords do not match' });
// //   }

// //   // Check if the email already exists
// //   const existingUser = await User.findOne({ email });
// //   if (existingUser) {
// //     return res.status(400).json({ message: 'Email already exists' });
// //   }

// //   // Hash the password before storing it
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   // Create a new user
// //   const newUser = new User({
// //     username,
// //     email,
// //     password: hashedPassword
// //   });

// //   try {
// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error registering user' });
// //   }
// // });

// // // Login Route
// // router.post('/login', async (req, res) => {
// //     const { email, password } = req.body;
  
// //     // Find the user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'User not found' });
// //     }
  
// //     // Compare the password with the hashed password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }
  
// //     // Generate a JWT token (valid for 1 hour)
// //     const token = jwt.sign({ userId: user._id, username: user.username }, 'your_jwt_secret_key', { expiresIn: '1h' });
  
// //     res.status(200).json({ message: 'Login successful', token });
// //   });
  
// //   module.exports = router;
// const express = require('express');
// // const { register, login, getUser } = require('../controllers/authController');
// const { register, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// // router.get('/getUser',getUser)
// module.exports = router;
const express = require('express');
const { register, login, visitorLogin, residentLogin, reslog, getUser, getUser1, getResidentByEmail, getVisitorByEmail, adminLogin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/reslog', reslog);
router.post('/visitorLogin', visitorLogin);
router.post('/residentLogin', residentLogin);
router.get('/resident/:email', getResidentByEmail);
router.get('/visitor/:email', getVisitorByEmail);

// router.get('/getUser', getUser);
router.get('/getUser', authMiddleware, getUser);
router.get('/getUser1', authMiddleware, getUser1);

module.exports = router;
