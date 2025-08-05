import Genbutton from "../components/Genbutton";
import Paymentcard from "../components/Payementcard";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
  const [isPaying, setIsPaying] = useState(false);
  const hasJustPaid = useRef(false);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = 50;
  const shipping = 29;
  const total = subtotal + tax + shipping;

  useEffect(() => {
    if (cartItems.length === 0 && !isPaying && !hasJustPaid.current) {
      navigate("/");
    }
  }, [cartItems, isPaying, navigate]);

  const handlePay = async () => {
    setIsPaying(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        setIsPaying(false);
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          productId: item._id || item.productId || "",
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal,
        tax,
        shipping,
        total,
      };

      const res = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (![200, 201].includes(res.status)) {
        throw new Error(res.data.message || "Order error");
      }

      toast.success("✅ Order confirmed!");
      hasJustPaid.current = true;
      clearCart();

      setTimeout(() => {
        navigate("/ThankYou");
      }, 1500);
    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const formattedAddress = `${data.address || ""}, ${data.city || ""}, ${data.state || ""} ${data.zipCode || ""}`;
        setUserAddress(formattedAddress);
      } catch (err) {
        console.error("❌ Address loading error:", err);
      }
    };

    fetchAddress();
  }, []);

  return (
    <section className="min-h-screen py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex justify-center items-center gap-3 py-4">
        <img src="/Paymenticon.png" alt="Payment" className="h-6 w-6" />
        <h1 className="text-xl font-medium font-Inter">Payment</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-[#EBEBEB] p-4 sm:p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h1 className="font-Inter font-medium text-lg sm:text-xl mb-4">Summary</h1>
            
            <div className="max-h-[300px] overflow-y-auto space-y-3 mb-6">
              {cartItems.map((item) => (
                <Paymentcard key={item._id} product={item} />
              ))}
            </div>

            {/* Payment Details */}
            <div className="space-y-6">
              <div>
                <h2 className="font-Inter font-medium text-sm text-[#545454] mb-2">Address</h2>
                <div className="flex justify-between items-center">
                  <p className="font-Inter font-normal text-base truncate max-w-[80%]" id="address">
                    {userAddress || "Loading address..."}
                  </p>
                  <img
                    src="editicon.png"
                    alt="Edit"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate("/profile", { state: { editAddress: true } })}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <h2 className="text-[#545454] font-Inter font-medium text-sm">Shipment method</h2>
                <p className="font-Inter font-normal text-base">Free</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-medium text-base">Subtotal</h1>
                <p className="font-Inter font-medium text-base">${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-normal text-sm text-[#545454]">Estimated shipping & Handling</h1>
                <p className="font-Inter font-medium text-base text-[#545454]">${shipping.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-normal text-sm text-[#545454]">Estimated Tax</h1>
                <p className="font-Inter font-medium text-base text-[#545454]">${tax.toFixed(2)}</p>
              </div>

              <div className="flex justify-between border-t border-[#EBEBEB] pt-4">
                <h2 className="font-Inter font-medium text-base">Total</h2>
                <p id="pricetotal" className="font-Inter font-bold text-base">${total.toFixed(2)}</p>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <h1 className="font-Inter font-bold text-xl text-center">Payment</h1>

                <div className="flex justify-center"> {/* Added this wrapper div */}
                  <label className="flex items-center space-x-2 cursor-default select-none">
                    <input type="checkbox" checked readOnly className="w-5 h-5 accent-black rounded-md" />
                    <span className="text-black text-base font-medium">Pay on delivery</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                  <Genbutton
                    type="submit"
                    w="w-full sm:w-[200px]"
                    h="h-14 sm:h-16"
                    bg="bg-black"
                    text={isPaying ? "Processing..." : "Pay"}
                    textsz="text-sm"
                    textco="text-white"
                    hover="hover:bg-gray-900"
                    onClick={handlePay}
                    disabled={isPaying}
                  />

                  <Genbutton
                    w="w-full sm:w-[200px]"
                    h="h-14 sm:h-16"
                    bg="bg-white"
                    text="Back"
                    textsz="text-sm"
                    textco="text-black"
                    hover="hover:bg-gray-100"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}