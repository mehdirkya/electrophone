import express from "express";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";
import { getAllOrders, updateOrderStatus } from "../Controllers/adminOrderController.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllOrders);
router.patch("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;