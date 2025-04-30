// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   const token = req.header("Authorization");
// //   if (!token) return res.status(401).json({ message: "No token, authorization denied" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // };
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied. No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret_key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;






// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied. No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret_key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization'); // ✅ Get the Authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Extract token after "Bearer "
  
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // ✅ Verify token
    req.user = decoded; // ✅ Store decoded user data in request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

