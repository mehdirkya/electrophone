export default function BrandFilter() {
  return (
    <div className="w-64 p-4 flex flex-col gap-5">
      <h2 className="text-lg font-medium mb-2">Brand</h2>
      <hr className="mb-3 border-gray-300" />
      <div className="flex flex-col gap-3">
        {[...Array(9)].map((_, i) => (
          <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="accent-black w-4 h-4"
            />
            <span className="text-black">BrandName <span className="text-gray-500">00</span></span>
          </label>
        ))}
      </div>
    </div>
  );
}
