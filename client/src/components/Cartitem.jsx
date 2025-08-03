import { useCart } from "../context/CartContext";

export default function Cartitem({ product }) {
  const { updateQuantity, removeFromCart } = useCart();

  const increment = () => updateQuantity(product._id, product.quantity + 1);
  const decrement = () => {
    if (product.quantity > 1) updateQuantity(product._id, product.quantity - 1);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-400 h-[125px] w-[500px]">
      <img src={product.imageUrl} className="w-[90px] h-[90px]" alt={product.name} />
      <div className="flex-col flex w-[200px] gap-2">
        <p className="text-[18px] font-medium font-Inter">{product.name}</p>
        <p className="font-Inter font-normal text-[16px]">#{product._id}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={decrement} className="text-xl font-bold w-6 h-6 cursor-pointer">-</button>
        <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm">
          {product.quantity}
        </span>
        <button onClick={increment} className="text-xl font-bold w-6 h-6 cursor-pointer">+</button>
      </div>

      <p className="text-[18px] font-semibold ml-6">${product.price * product.quantity}</p>

      <button onClick={() => removeFromCart(product._id)} className="text-xl font-bold ml-4 cursor-pointer">×</button>
    </div>
  );
}
