import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import BrandFilter from "../components/Brandfilter";
import Productcard from "../components/Productcard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PRODUCTS_PER_PAGE = 9;

export default function Products() {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandFromURL = queryParams.get("brand");

  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category],[page]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/brands?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        if (brandFromURL) {
          const matchedBrand = data.find(
            (b) => b.toLowerCase() === brandFromURL.toLowerCase()
          );
          if (matchedBrand) {
            setSelectedBrands(new Set([matchedBrand]));
          }
        }
      })
      .catch(console.error);
  }, [category, brandFromURL]);

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
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(console.error);
  }, [selectedBrands, page, category]);

  const toggleBrand = (brand) => {
    setPage(1);
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

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="bg-white text-gray-900 min-h-screen px-4 py-6">
      {/* Breadcrumbs */}
      <div className="w-full mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[18px] text-black hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400 text-[18px]">/</span>
          <span className="capitalize font-semibold text-black text-[18px]">
            {category}
          </span>
        </div>
      </div>

      {/* Layout container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filter */}
        <div className="w-full lg:w-[30%]">
          <BrandFilter
            brands={brands}
            selectedBrands={selectedBrands}
            onToggleBrand={toggleBrand}
          />
        </div>

        {/* Products section */}
        <div className="w-full lg:w-[70%] flex flex-col">
          <div className="flex justify-center items-center mb-4 h-[60px]">
            <span className="text-lg text-gray-500">
              Showing {products.length} of {totalProducts} products
            </span>
          </div>

          {/* Product grid */}
          <div className="flex justify-center">
            <div className="w-full max-w-[1200px] px-2">
              {products.length === 0 ? (
                <p className="text-center text-lg text-gray-600">
                  No products found.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
                  {products.map((product) => (
                    <Productcard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center py-7">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`relative inline-flex items-center justify-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                } w-[40px] h-[40px]`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="size-5" />
              </button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  aria-current={page === num ? "page" : undefined}
                  className={`w-[40px] h-[40px] relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                    page === num
                      ? "z-10 bg-indigo-600 text-white"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={`w-[40px] h-[40px] relative inline-flex items-center justify-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ${
                  page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
