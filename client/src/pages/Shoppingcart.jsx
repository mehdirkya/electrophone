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
    <div className="w-full h-[700px] flex flex-col justify-center items-center">
      {showAlert && (
        <div className="h-[50px]">
          <div className="mb-4 p-3 w-[1120px] bg-red-100 text-red-700 border border-red-300 rounded text-center font-medium">
            Your cart is empty. You can't proceed to checkout.
          </div>
        </div>
      )}

      <div className="w-[1120px] h-[556px] flex justify-center items-center gap-5">
        <div className="flex-col flex gap-10 w-[60%] h-[100%]">
          <h1 className="text-[24px] font-semibold font-Inter">Shopping Cart</h1>

          <div className="overflow-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => <Cartitem key={item._id} product={item} />)
            )}
          </div>
        </div>

        <div className="w-[500px] h-[420px] border border-[#d2d0d0] rounded-r-2xl flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[20px] font-bold font-Inter">Order Summary</h1>
            <div className="flex justify-between">
              <p className="text-[18px] font-medium font-Inter">Subtotal</p>
              <p className="text-[18px] font-medium font-Inter">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[18px] font-normal font-Inter">Estimated Tax</p>
              <p className="text-[18px] font-medium font-Inter">${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[18px] font-normal font-Inter">Estimated shipping & Handling</p>
              <p className="text-[18px] font-medium font-Inter">${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[18px] font-medium font-Inter">Total</p>
              <p className="text-[18px] font-medium font-Inter">${total.toFixed(2)}</p>
            </div>
            <Genbutton
              h="h-[56px]"
              w="w-[350px]"
              text="Checkout"
              textco="text-white"
              textsz="text-[16px]"
              bg="bg-black"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
