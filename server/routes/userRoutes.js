import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { registerUser, loginUser } from "../Controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
      zipCode: user.zipcode, // lowercase in DB, renamed here
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      phone,
      password,
      country,
      address,
      city,
      state,
      zipCode,
    } = req.body;

    if (phone) user.phone = phone;
    if (password) {
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (country) user.country = country;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (zipCode) user.zipcode = zipCode;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        country: user.country,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipcode,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});





export default router;
