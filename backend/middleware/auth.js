/**
 * @file auth.js - Middleware for authentication and authorization
 */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Incoming Token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // 🐛 TEMPORARY DEBUG

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    // Ensure we have the user ID in the request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    };
    
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = verifyToken;