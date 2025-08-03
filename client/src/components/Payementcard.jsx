export default function Paymentcard({ product }) {
  return (
    <div className="h-[72px] w-[1072px] bg-[#F6F6F6] rounded-2xl flex justify-between items-center px-5">
      <div className="flex items-center gap-5">
        <img src={product.imageUrl} alt={product.name} className="w-[35px] h-[40px] object-cover" />
        <h1 className="font-Inter font-medium text-[16px]">{product.name}</h1>
      </div>
      <h1 className="font-Inter font-bold text-[16px]">${(product.price * product.quantity).toFixed(2)}</h1>
    </div>
  );
}
