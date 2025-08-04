import Genbutton from "../components/Genbutton";
import Paymentcard from "../components/Payementcard";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ NÉCESSAIRE



export default function Payment() {
  const [isPaying, setIsPaying] = useState(false);
  const hasJustPaid = useRef(false); // cette ligne empêche la boucle de redirection

  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = 50;
  const shipping = 29;
  const total = subtotal + tax + shipping;

  // Redirection si panier vide
  useEffect(() => {
    if (cartItems.length === 0 && !isPaying && !hasJustPaid.current) {
      navigate("/");
    }
  }, [cartItems, isPaying, navigate]);


  // Création commande au clic
  const handlePay = async () => {
  setIsPaying(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vous devez être connecté.");
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
      throw new Error(res.data.message || "Erreur lors de la commande");
    }

    toast.success("✅ Commande enregistrée !");
    hasJustPaid.current = true; // ✅ bloquer la redirection vers "/"
    clearCart();

    setTimeout(() => {
      navigate("/ThankYou");
    }, 1500);
  } catch (err) {
    console.error("❌ Erreur de paiement :", err);
    toast.error(err.response?.data?.message || err.message || "Une erreur s'est produite");
  } finally {
    setIsPaying(false);
  }
};


  // Chargement adresse
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
        console.error("❌ Erreur chargement adresse :", err);
      }
    };

    fetchAddress();
  }, []);

  return (
    <section className="h-[1100px]">
      <div className="h-[72px] flex justify-center gap-3 items-center">
        <img src="/Paymenticon.png" alt="" className="h-[24px] w-[24px]" />
        <h1 className="text-[19px] font-medium font-Inter">Payment</h1>
      </div>

      <div className="h-[88%] flex justify-center items-center">
        <div className="h-[948px] w-[1120px] flex flex-col gap-y-10 items-center justify-start py-6 border-2 border-[#EBEBEB]">
          <div className="h-[20%]">
            <h1 className="font-Inter font-medium text-[20px] w-[95%]">Summary</h1>

            <div className="flex-col flex gap-3 max-h-[200px] overflow-y-auto">
              {cartItems.map((item) => (
                <Paymentcard key={item._id} product={item} />
              ))}
            </div>

            <div className="w-[1072px] h-[328px] flex flex-col gap-7">
              <div>
                <h2 className="font-Inter font-medium text-[14px] text-[#545454]">Address</h2>
                <div className="flex justify-between items-center">
                  <p className="font-Inter font-normal text-[16px] " id="address">
                    {userAddress || "Loading address..."}
                  </p>
                  <img
                    src="editicon.png"
                    alt=""
                    className="w-[24px] h-[24px] cursor-pointer"
                    onClick={() => navigate("/profile", { state: { editAddress: true } })}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <h2 className="text-[#545454] font-Inter font-medium text-[14px]">Shipment method</h2>
                <p className="font-Inter font-normal text-[16px]">Free</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-medium text-[16px]">Subtotal</h1>
                <p className="font-Inter font-medium text-[16px]">${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-normal text-[14px] text-[#545454]">Estimated shipping & Handling</h1>
                <p className="font-Inter font-medium text-[16px] text-[#545454]">${shipping.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <h1 className="font-Inter font-normal text-[14px] text-[#545454]">Estimated Tax</h1>
                <p className="font-Inter font-medium text-[16px] text-[#545454]">${tax.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <h2 className="font-Inter font-medium text-[16px]">Total</h2>
                <p id="pricetotal" className="font-Inter font-bold text-[16px]">${total.toFixed(2)}</p>
              </div>

              <div className="flex flex-col gap-15">
                <h1 className="font-Inter font-bold text-[20px] text-center">Payment</h1>

                <label className="flex items-center space-x-2 cursor-default select-none">
                  <input type="checkbox" checked readOnly className="w-5 h-5 accent-black rounded-md" />
                  <span className="text-black text-[16px] font-medium">Pay on delivery</span>
                </label>

                <div className="flex justify-center gap-5 items-center">
                  <Genbutton
                      type="submit"
                      w="w-[201px]"
                      h="h-[64px]"
                      bg="bg-black"
                      text={isPaying ? "Processing..." : "Pay"}
                      textsz="text-sm"
                      textco="text-white"
                      hover="hover:bg-gray-900"
                      onClick={handlePay}
                      disabled={isPaying}
                    />

                  <Genbutton
                    w="w-[201px]"
                    h="h-[64px]"
                    bg="bg-white"
                    text="Back"
                    textsz="text-[14px]"
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
