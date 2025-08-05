export default function Paymentcard({ product }) {
  return (
    <div className="h-18 sm:h-20 w-full bg-[#F6F6F6] rounded-2xl flex justify-between items-center p-3 sm:p-5">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="w-8 h-10 sm:w-9 sm:h-10 flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
        <h1 className="font-Inter font-medium text-sm sm:text-base line-clamp-1">{product.name}</h1>
      </div>
      <h1 className="font-Inter font-bold text-sm sm:text-base">${(product.price * product.quantity).toFixed(2)}</h1>
    </div>
  );
}