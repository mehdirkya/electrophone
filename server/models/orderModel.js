import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  quantity: Number,
  price: Number,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    orderStatus: {
      type: String,
      default: "Pending", // Could be Pending, Processing, Delivered, Cancelled
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
