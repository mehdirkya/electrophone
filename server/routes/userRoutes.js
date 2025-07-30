import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { registerUser , loginUser } from "../Controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
  id: user._id,
  email: user.email,
  phone: user.phone,
  country: user.country,
  address: user.address,
  city: user.city,
  state: user.state,
  zipCode: user.zipcode, // ✅ rename here
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
