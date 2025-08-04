import express from "express";
import { createOrder } from "../Controllers/orderController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

export default router;
