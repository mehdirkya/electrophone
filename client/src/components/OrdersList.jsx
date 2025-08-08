import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const OrderList = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-6 mb-6 shadow-sm bg-white"
          >
            <p className="mb-2">
              <strong>Order ID:</strong> {order._id}
            </p>

            <div className="mb-4">
              <strong>Items:</strong>
              <ul className="mt-2 space-y-2">
                {order.items?.map((item) => (
                  <li key={item._id} className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-md border overflow-hidden bg-white">
                      <img
                        src={item.productId?.imageUrl || "/placeholder.png"}
                        alt={item.productId?.name || "Product Image"}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{item.productId?.name || item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.productId?.price || item.price}</p>
                    </div>
                  </li>
                )) || <li>No items</li>}
              </ul>
            </div>

            <p>
              <strong>Total:</strong> ${order.total}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
