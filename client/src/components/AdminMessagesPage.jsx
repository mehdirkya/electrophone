import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminMessagesPage() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [token]);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Messages</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border p-4 rounded-md mb-4 bg-white shadow">
            <p><strong>Name:</strong> {msg.fullName}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Subject:</strong> {msg.subject}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Sent on: {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
