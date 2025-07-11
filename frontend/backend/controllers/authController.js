// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, role });
//         await newUser.save();
//         res.json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };
const User = require('../models/User');
const Visitor = require('../models/Visitor');
const Resident = require('../models/Resident');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email
    const user = await Resident.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
  
    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Generate a JWT token (valid for 1 hour) & store email in it
    const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email }, 
        'your_jwt_secret_key', 
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
};
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token (valid for 1 hour) & store email in it
  const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email }, 
      'your_jwt_secret_key', 
      { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Login successful', token });
};

exports.visitorLogin = async (req, res) => {
  const { name, email } = req.body;

  // Find the user by email
  const user = await Visitor.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }

  

  // Generate a JWT token (valid for 1 hour) & store email in it
  const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email }, 
      'your_jwt_secret_key', 
      { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Visitor Login successful', token });
};

exports.reslog = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  
  const user = await Resident.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'Resident not found' });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: 'Invalid credentials' });
}


  // Generate a JWT token (valid for 1 hour) & store email in it
  const token = jwt.sign(
      { userId: user._id, email: user.email, password: user.password }, 
      'your_jwt_secret_key', 
      { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Resident Login successful', token });
};

exports.getResidentByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Resident.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    // Return name and other info
    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      apartment: user.apartment,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getVisitorByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Visitor.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    // Return name and other info
    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.residentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Resident.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//new
exports.getUser = async (req, res) => {
  try {
      console.log("Received request for /getUser");

      // Extract token from header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

      // Verify token & extract email
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      console.log("Decoded token:", decoded);

      // Get email stored in sessionStorage (Sent from frontend)
      const storedEmail = req.headers['x-user-email']; // Custom header from frontend

      console.log("Stored email from frontend:", storedEmail);

      // Find user by email
      const user = await Resident.findOne({ email: decoded.email }).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Compare email from frontend & database
      if (storedEmail && storedEmail !== user.email) {
          return res.status(400).json({ message: 'Email mismatch - Unauthorized' });
      }

      res.json(user);
  } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ message: 'Error fetching user data' });
  }
};

exports.getUser1 = async (req, res) => {
  try {
      console.log("Received request for /getUser1");

      // Extract token from header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

      // Verify token & extract email
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      console.log("Decoded token:", decoded);

      // Get email stored in sessionStorage (Sent from frontend)
      const storedEmail = req.headers['x-user-email']; // Custom header from frontend

      console.log("Stored email from frontend:", storedEmail);

      // Find user by email
      const user = await Visitor.findOne({ email: decoded.email }).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Compare email from frontend & database
      if (storedEmail && storedEmail !== user.email) {
          return res.status(400).json({ message: 'Email mismatch - Unauthorized' });
      }

      res.json(user);
  } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ message: 'Error fetching user data' });
  }
};
// exports.getUser = async (req, res) => {
//     try {
//       console.log("Received request for /getUser");
  
//       // Check if Authorization header exists
//       if (!req.headers.authorization) {
//         console.log("Authorization header missing");
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//       }
  
//       // Extract token from header
//       const token = req.headers.authorization.split(' ')[1];
//       console.log("Token received:", token);
  
//       if (!token) {
//         console.log("Token is null");
//         return res.status(401).json({ message: 'Unauthorized - Token is null' });
//       }
  
//       // Verify JWT token
//       const decoded = jwt.verify(token, 'your_jwt_secret_key');
//       console.log("Decoded token:", decoded);
  
//       // Find user by ID
//       const user = await User.findById(decoded.userId).select('-password');
//       console.log("User found:", user);
  
//       if (!user) {
//         console.log("User not found");
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error.message);
//       res.status(500).json({ message: 'Error fetching user data' });
//     }
//   };

// exports.getUser = async (req, res) => {
//     try {
//       console.log("Received request for /getUser");
  
//       const token = req.headers.authorization?.split(' ')[1];
//       console.log("Token received:", token);
  
//       if (!token) {
//         console.log("No token provided");
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
  
//       const decoded = jwt.verify(token, 'your_jwt_secret_key');
//       console.log("Decoded token:", decoded);
  
//       const user = await User.findById(decoded.userId).select('-password');
//       console.log("User found:", user);
  
//       if (!user) {
//         console.log("User not found");
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error.message);
//       res.status(500).json({ message: 'Error fetching user data' });
//     }
//   };
  
// exports.getUser = async (req, res) => {
//     try {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
//       const decoded = jwt.verify(token, 'your_jwt_secret_key');
//       const user = await User.findById(decoded.userId).select('-password');
  
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching user data' });
//     }
//   };