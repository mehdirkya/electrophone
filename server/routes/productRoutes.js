const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../auth"); // adapte le chemin si besoin
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// Routes publiques
router.get("/", getProducts);

// Routes protégées admin
router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

module.exports = router;
