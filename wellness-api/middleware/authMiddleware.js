const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  // If no token is provided, deny access
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging (optional, remove in production)
    console.log("Decoded Token:", decoded);

    // Find the user by the id provided in the decoded token
    req.user = await User.findById(decoded.id).select("-password");

    // If user is not found, deny access
    if (!req.user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Log the error to the console (useful for debugging)
    console.error("Token verification failed:", err);

    // Send back a 401 error with the message for invalid token
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
