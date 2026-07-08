const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Authorization header se token lena
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // "Bearer token" me se token alag karna
    const token = authHeader.split(" ")[1];

    // Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ki information request me save karna
    req.user = decoded;

    // Agle function par jana
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;