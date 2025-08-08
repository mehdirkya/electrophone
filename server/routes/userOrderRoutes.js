    import express from "express";
    import { protect } from "../Middleware/authMiddleware.js";
    import { getUserOrders } from "../Controllers/userOrderController.js";

    const router = express.Router();

    router.get("/", protect, getUserOrders);

    export default router;
