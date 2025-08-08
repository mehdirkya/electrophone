import express from "express";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";
import { createMessage, getMessages } from "../Controllers/contactController.js";

const router = express.Router();

router.post("/", createMessage); // public route for users to send messages
router.get("/", protect, isAdmin, getMessages); // admin-only to fetch all messages

export default router;
