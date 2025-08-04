import { Order } from "../models/orderModel.js";

export const createOrder = async (req, res) => {

  const { items, subtotal, tax, shipping, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Vérifie que l’utilisateur est bien récupéré depuis le middleware
  try {
    const order = await Order.create({
      user: req.user.id, // Attention ici : .id et non ._id car middleware l’a défini comme { id: ... }
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod: "Cash on Delivery",
      orderStatus: "Pending",
    });


    res.status(201).json(order);
  } catch (error) {
    console.error("🔥 Erreur lors de la création de la commande :", error.message);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};
