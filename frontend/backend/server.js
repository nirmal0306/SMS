// // // // // const express = require("express");
// // // // // const mongoose = require("mongoose");
// // // // // const dotenv = require("dotenv");
// // // // // const cors = require("cors");
// // // // //
// // // // // dotenv.config();
// // // // //
// // // // // const app = express();
// // // // // app.use(express.json());
// // // // // app.use(cors());
// // // // //
// // // // // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // // //     .then(() => console.log("MongoDB connected"))
// // // // //     .catch(err => console.error(err));
// // // // //
// // // // // app.use("/api/residents", require("./routes/residentRoutes"));
// // // // // app.use("/api/auth", require("./routes/authRoutes"));
// // // // //
// // // // // const PORT = process.env.PORT || 5000;
// // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // const cors = require("cors");
// // // // const dotenv = require("dotenv");
// // // //
// // // // dotenv.config();
// // // //
// // // // const app = express();
// // // // app.use(express.json());
// // // // app.use(cors());
// // // //
// // // // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // // //   .then(() => console.log("MongoDB connected"))
// // // //   .catch(err => console.error(err));
// // // //
// // // // app.use("/api/auth", require("./routes/authRoutes"));
// // // //
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const bodyParser = require('body-parser');
// // // const bcrypt = require('bcryptjs');
// // // const cors = require('cors');
// // // const authRoutes = require('./routes/authRoutes.js')
// // // const app = express();
// // // app.use(cors());
// // // app.use(bodyParser.json());
// // // app.use('/api/auth',authRoutes)

// // // mongoose.connect('mongodb://localhost:27017/db1', { useNewUrlParser: true, useUnifiedTopology: true })
// // //   .then(() => console.log('Connected to MongoDB'))
// // //   .catch(err => console.error('Error connecting to MongoDB:', err));

// // // // Start the server
// // // const port = 5000;
// // // app.listen(port, () => {
// // //   console.log(`Server is running on http://localhost:${port}`);
// // // });
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const cors = require('cors');

// // const app = express();
// // app.use(cors());
// // app.use(bodyParser.json());

// // // MongoDB connection
// // mongoose.connect('mongodb://localhost:27017/db1', { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('Error connecting to MongoDB:', err));

// // // User Schema and Model
// // const userSchema = new mongoose.Schema({
// //   username: String,
// //   email: String,
// //   password: String
// // });

// // const User = mongoose.model('User', userSchema);

// // // Register Route
// // app.post('/register', async (req, res) => {
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
// // app.post('/login', async (req, res) => {
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
  
// // // Start the server
// // const port = 5000;
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to Database
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const visitorPurposeRoutes = require('./routes/visitorPurposeRoutes');
const authRoutes = require('./routes/authRoutes');
const residentRoutes = require('./routes/residentRoutes');
const visitorRoutes = require('./routes/visitorRoutes')
const maintenanceRoutes = require('./routes/maintenanceRoutes')
const noticeRoutes = require('./routes/noticeRoutes')
const eventRoutes = require('./routes/eventRoutes');
const chatbotRoute = require('./routes/chatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Routes
app.use('', authRoutes);
app.use("/residents", residentRoutes);
app.use("/visitors", visitorRoutes);
app.use('/visitor-purpose', visitorPurposeRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images statically
app.use('/notices', noticeRoutes);
app.use('/events', eventRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/complaint', complaintRoutes);

app.use('/chatbot', chatbotRoute);
app.use('/parking', parkingRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
