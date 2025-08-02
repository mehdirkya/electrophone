import express from "express";
import multer from "multer";
import storage from "../utils/storage.js";
import {
  addProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getBrandsByCategory
} from "../Controllers/productController.js";

const upload = multer({ storage });
const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/filtered", getFilteredProducts);
router.get("/brands", getBrandsByCategory);
router.get("/:id", getProductById);



export default router;
