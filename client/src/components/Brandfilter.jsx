// BrandFilter.jsx
export default function BrandFilter({ brands, selectedBrands, onToggleBrand }) {
  return (
    <div className="w-[200px] flex flex-col gap-4 p-4 border-r border-gray-300">
      <h2 className="font-semibold mb-2">Brands</h2>
      {brands.map((brand) => (
        <label key={brand} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedBrands.has(brand)}
            onChange={() => onToggleBrand(brand)}
          />
          <span>{brand}</span>
        </label>
      ))}
    </div>
  );
}
