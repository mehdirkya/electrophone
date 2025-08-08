// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// Middleware to verify token and attach user info
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,          // use this in controllers, not _id
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

// ✅ Middleware to check for admin privileges
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};
