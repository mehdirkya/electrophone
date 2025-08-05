import { useCart } from "../context/CartContext";

export default function Cartitem({ product }) {
  const { updateQuantity, removeFromCart } = useCart();

  const increment = () => updateQuantity(product._id, product.quantity + 1);
  const decrement = () => {
    if (product.quantity > 1) updateQuantity(product._id, product.quantity - 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-400 w-full">
      {/* Changed image container to maintain aspect ratio */}
      <div className="w-[90px] h-[90px] flex-shrink-0 flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          className="max-w-full max-h-full object-contain" 
          alt={product.name} 
        />
      </div>
      
      <div className="flex flex-col w-full sm:w-[200px] gap-2">
        <p className="text-[18px] font-medium font-Inter">{product.name}</p>
        <p className="font-Inter font-normal text-[16px] truncate">#{product._id}</p>
      </div>

      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        <button onClick={decrement} className="text-xl font-bold w-6 h-6 cursor-pointer">-</button>
        <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm">
          {product.quantity}
        </span>
        <button onClick={increment} className="text-xl font-bold w-6 h-6 cursor-pointer">+</button>
      </div>

      <p className="text-[18px] font-semibold mt-3 sm:mt-0 ml-0 sm:ml-6">${(product.price * product.quantity).toFixed(2)}</p>

      <button
        onClick={() => removeFromCart(product._id)}
        className="text-xl font-bold mt-3 sm:mt-0 ml-0 sm:ml-4 cursor-pointer"
        aria-label={`Remove ${product.name} from cart`}
      >
        ×
      </button>
    </div>
  );
}