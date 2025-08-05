import { Link } from "react-router-dom";

export default function Productcard({ product }) {
  if (!product) return null;

  return (
    <Link to={`/product/${product._id}`} className="no-underline text-inherit w-full max-w-[220px]">
      <div
        className="
          w-full h-[300px] rounded-[10px] cursor-pointer
          bg-gradient-to-br from-white to-gray-50
          border border-gray-200
          shadow-lg
          hover:scale-[1.03] hover:shadow-2xl
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center gap-3 p-4
          relative
        "
      >
        <div className="absolute inset-0 rounded-[10px] pointer-events-none shadow-inner"></div>
        <img
          src={product.imageUrl || "/default-image.png"}
          alt={product.name}
          className="h-[140px] w-[120px] sm:h-[160px] sm:w-[140px] object-contain z-10"
        />
        <p className="text-[16px] font-medium font-Inter text-center z-10">{product.name}</p>
        <h2 className="text-[20px] font-semibold font-Inter z-10">${product.price}</h2>
      </div>
    </Link>
  );
}
