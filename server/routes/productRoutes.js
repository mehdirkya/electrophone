import express from "express";
import multer from "multer";
import storage from "../utils/storage.js";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  getFilteredProducts
} from "../Controllers/productController.js";

const upload = multer({ storage });
const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.get("/filter", getFilteredProducts);


export default router;
