import express from "express";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";
import { addProduct, updateProduct, deleteProduct } from "../Controllers/productController.js";
import upload from "../utils/upload.js"; // ✅ FIXED

const router = express.Router();

router.post("/", protect, isAdmin, upload.single("image"), addProduct);
router.put("/:id", protect, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
