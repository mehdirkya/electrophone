export default function BrandFilter({ brands, selectedBrands, onToggleBrand }) {
  const handleClearFilters = () => {
    selectedBrands.forEach((brand) => onToggleBrand(brand));
  };

  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-[300px] h-auto lg:h-[95%] bg-white rounded-lg p-5 shadow-sm border border-gray-200 flex flex-col">
        <div className="flex flex-col gap-6 justify-around">
          <div className="flex justify-between items-center mb-4 pb-4 border-b h-[60px] border-gray-200">
            <h2 className="text-lg font-bold">Filter by Brand</h2>
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex justify-center">
            <div className="max-h-[400px] w-full flex flex-col gap-6 overflow-auto">
              {brands.length === 0 ? (
                <p className="text-gray-500 text-sm">Loading brands...</p>
              ) : (
                brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex h-full items-center gap-3 cursor-pointer py-1.5 hover:bg-gray-50 px-2 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.has(brand)}
                      onChange={() => onToggleBrand(brand)}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black transition-all duration-200"
                    />
                    <span className="text-sm text-gray-700 text-[20px]">{brand}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
