import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminOrderList = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = ["Pending", "Processing", "Delivered", "Cancelled"];

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch admin orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: res.data.orderStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user?.email || "N/A"}</p>

            <ul className="my-4 space-y-2">
              {order.items.map((item) => (
                <li key={item._id} className="flex items-center gap-4">
                    <div className="w-24 aspect-[3/4] flex items-center justify-center rounded-md border bg-white">
                        <img
                            src={item.productId?.imageUrl || "/placeholder.png"}
                            alt={item.productId?.name || "Product Image"}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div>
                    <p className="font-semibold">{item.productId?.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>${item.productId?.price || item.price}</p>
                    </div>
                </li>
              ))}
            </ul>

            <p><strong>Total:</strong> ${order.total}</p>

            <div className="mt-4">
              <label htmlFor={`status-${order._id}`} className="block font-semibold mb-1">
                Status:
              </label>
              <select
                id={`status-${order._id}`}
                className="border px-2 py-1 rounded"
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrderList;
