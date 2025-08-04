// src/pages/ThankYou.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your order has been placed successfully and will be delivered soon.
      </p>
      <div className="flex items-center gap-2 text-blue-600 font-medium">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Redirecting to homepage...</span>
      </div>
    </div>
  );
}
