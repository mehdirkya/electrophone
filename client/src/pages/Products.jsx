import { useEffect, useState } from "react";
import BrandFilter from "../components/Brandfilter"; // We will adapt it here to accept props
import Productcard from "../components/Productcard";
import { useParams } from "react-router-dom";


const PRODUCTS_PER_PAGE = 9;

export default function Products() {
  const { category } = useParams();
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch brands for category on mount
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/brands?category=${category}`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch(console.error);
  }, []);

  // Fetch products whenever filters or page change
  useEffect(() => {
    const brandQuery = Array.from(selectedBrands).join(",");
    const params = new URLSearchParams({
      category: category,
      brand: brandQuery,
      page,
      limit: PRODUCTS_PER_PAGE,
    });

    fetch(`http://localhost:5000/api/products/filtered?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
      })
      .catch(console.error);
  }, [selectedBrands, page]);

  // Handle brand checkbox toggle
  const toggleBrand = (brand) => {
    setPage(1); // reset to first page on filter change
    setSelectedBrands((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(brand)) {
        newSet.delete(brand);
      } else {
        newSet.add(brand);
      }
      return newSet;
    });
  };

  // Pagination controls
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <section className="h-full">
      <div className="flex items-center gap-2 text-sm font-inter text-[#B0B0B0] h-[100px]">
        <div className="flex items-center gap-2 text-sm font-inter justify-center w-[28%]">
          <span className="hover:underline cursor-pointer">Home</span>
          <span>{">"}</span>
          <span className="hover:underline cursor-pointer">Catalog</span>
          <span>{">"}</span>
          <span className="text-black font-semibold">{category}</span>
        </div>
      </div>

      <div className="w-full h-[1560px] flex justify-center">
        {/* Pass brands and toggle handler to BrandFilter */}
        <BrandFilter
          brands={brands}
          selectedBrands={selectedBrands}
          onToggleBrand={toggleBrand}
        />

        <div className="w-[1119px] h-[1480px] flex gap-20 justify-center flex-col">
          <h1>
            Selected Products : {totalProducts}
          </h1>

          <div className="grid grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <Productcard key={product._id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="w-full flex justify-center mt-6">
            <div className="flex gap-2 border border-gray-300 text-sm font-medium rounded-lg h-[36px] items-center px-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={`px-3 py-1 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                &lt;
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => setPage(num + 1)}
                  className={`px-3 py-1 rounded ${
                    page === num + 1 ? "bg-black text-white" : "hover:underline"
                  }`}
                >
                  {num + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={`px-3 py-1 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
