import { Order } from "../models/orderModel.js";



export const getAllOrders = async (req, res) => {
  try {
    // Populate user email and product details (name, imageUrl) inside items.productId
    const orders = await Order.find()
      .populate("user", "email") // populate user email only
      .populate("items.productId", "name imageUrl") // populate product name and imageUrl only
      .exec();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};


// UPDATE order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};
