import { useState } from "react";
export default function Cartitem(){

  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  return(
      <div className="flex items-center gap-4 py-4 border-b border-gray-400 h-[125px] w-[500px]">
        <img
          src="/Iphone 14 pro.png"
          className="w-[90px] h-[90px]"
          alt="iphone 14 pro"
        />
        <div className="flex-col flex w-[200px] gap-2">
          <p className="text-[18px] font-medium font-Inter">
            Apple iPhone 14 Pro Max 128Gb Deep Purple
          </p>
          <p className="font-Inter font-normal text-[16px]">
            #25139526913984
          </p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            className="text-xl font-bold w-6 h-6 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer"
          >
            -
          </button>
          <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm">
            {quantity}
          </span>
          <button
            onClick={increment}
            className="text-xl font-bold w-6 h-6 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Price */}
        <p className="text-[18px] font-semibold ml-6">$1399</p>

        {/* Remove Button */}
        <button className="text-xl font-bold ml-4 transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer">
          ×
        </button>
      </div>
  );
}