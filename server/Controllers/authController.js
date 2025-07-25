const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register admin (à sécuriser ou à faire une fois en DB)
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const admin = new User({ username, password: hashed, role: "admin" });
    await admin.save();
    res.status(201).json({ message: "Admin créé !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
