import mongoose from "mongoose";

const specSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. "Screen Size"
  value: { type: String, required: true }, // e.g. "6.7\""
  icon: { type: String, required: true },  // e.g. "/icons/screen.svg"
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    imageUrl: { type: String },
    imageId: { type: String },
    inStock: { type: Boolean, default: true },
    newArrival: { type: Boolean, default: false },  // <-- NEW FIELD ADDED HERE
    specs: [specSchema],
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);
export default Product;
