import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);  // <-- ADD THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
