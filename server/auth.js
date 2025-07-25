const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456"; // change pour un mot de passe sécurisé
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Route login admin simple
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Générer token
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Identifiants invalides" });
});

// Middleware pour vérifier token admin
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

    next();
  } catch {
    return res.status(401).json({ message: "Token invalide" });
  }
}

module.exports = { router, verifyAdmin };
