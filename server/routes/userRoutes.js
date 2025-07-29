import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { registerUser , loginUser } from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    userId: req.user.id, // extracted from token
  });
});

export default router;
