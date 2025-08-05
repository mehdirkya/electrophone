import Cartitem from "../components/cartitem";
import { useCart } from "../context/CartContext";
import Genbutton from "../components/Genbutton";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Shoppingcart() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = 50;
  const shipping = 29;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (!token) {
      toast.loading("You need to log in first. Redirecting...", {
        icon: "🔒",
        duration: 1800,
      });
      setTimeout(() => {
        navigate("/login", { state: { from: "/payment" } });
      }, 1800);
      return;
    }

    navigate("/payment");
  };

  return (
    <div className="w-full min-h-[calc(100vh-150px)] flex flex-col items-center px-4 py-6 md:py-10">
      {showAlert && (
        <div className="h-[50px] w-full max-w-[1120px]">
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-center font-medium">
            Your cart is empty. You can't proceed to checkout.
          </div>
        </div>
      )}

      <div className="w-full max-w-[1120px] flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Cart Items Section */}
        <div className="flex flex-col w-full md:w-[60%] gap-6">
          <h1 className="text-2xl font-semibold font-Inter">Shopping Cart</h1>

          <div className="overflow-auto max-h-[400px] md:max-h-[70vh] pr-2">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => <Cartitem key={item._id} product={item} />)
            )}
          </div>
        </div>

        {/* Order Summary Section - Sticky on desktop */}
        <div className="w-full md:sticky md:top-28 md:w-[40%] h-fit border border-[#d2d0d0] rounded-xl p-6">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold font-Inter">Order Summary</h1>
            <div className="flex justify-between">
              <p className="text-lg font-medium font-Inter">Subtotal</p>
              <p className="text-lg font-medium font-Inter">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-normal font-Inter">Estimated Tax</p>
              <p className="text-lg font-medium font-Inter">${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-normal font-Inter">Estimated shipping & Handling</p>
              <p className="text-lg font-medium font-Inter">${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium font-Inter">Total</p>
              <p className="text-lg font-medium font-Inter">${total.toFixed(2)}</p>
            </div>
            <Genbutton
              h="h-14"
              w="w-full"
              text="Checkout"
              textco="text-white"
              textsz="text-base"
              bg="bg-black"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}