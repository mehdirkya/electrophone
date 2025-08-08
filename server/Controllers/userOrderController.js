import { Order } from "../models/orderModel.js";

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;


    const orders = await Order.find({ user: userId })
      .populate("items.productId", "name imageUrl price")
      .sort({ createdAt: -1 });


    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};
