import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Specs from "../components/Specs";
import Genbutton from "../components/Genbutton";
import Randomcomp from "../components/Randomcomp";
import Productcard from "../components/Productcard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Productdetail() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        fetch(`http://localhost:5000/api/products/${id}/related`)
          .then((res) => res.json())
          .then((related) => setRelatedProducts(related))
          .catch((err) =>
            console.error("Error fetching related products:", err)
          );
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  if (!product)
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;

  const shortText = product.description?.slice(0, 150);
  const fullText = product.description;

  return (
    <div className="px-4 py-16">
      {/* Product detail section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center max-w-6xl mx-auto">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-[500px] w-auto object-contain"
        />

        <div className="flex flex-col gap-8 max-w-xl">
          <div>
            <h1 className="text-[30px] font-bold font-Inter">{product.name}</h1>
            <h2 className="text-[25px] font-medium font-Inter">${product.price}</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(product.specs || []).map((spec, index) => (
                <Specs
                  key={index}
                  label={spec.label}
                  value={spec.value}
                  icon={spec.icon}
                />
              ))}
            </div>

            {/* Description with toggle */}
            <p className="text-gray-700">
              {expanded ? fullText : shortText}
              {fullText?.length > 150 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="ml-2 text-black underline hover:text-blue-600 transition-colors"
                >
                  {expanded ? "less..." : "more..."}
                </button>
              )}
            </p>

            <Genbutton
              w="w-full"
              h="h-[64px]"
              bg="bg-black"
              text="Add to Cart"
              textsz="text-sm"
              textco="text-white"
              hover="hover:bg-gray-900"
              onClick={handleAddToCart}
            />

            <div className="flex flex-wrap gap-4">
              <Randomcomp text1="Free Delivery" text2="1-2 day" img="/delivery.png" />
              <Randomcomp
                text1="In Stock"
                text2={product.inStock ? "Today" : "Out"}
                img="/shopicon.png"
              />
              <Randomcomp text1="Guaranteed" text2="1 year" img="/delivery.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="mt-16 max-w-6xl mx-auto px-2">
        <h1 className="font-Inter font-medium text-[24px] mb-6 text-center">
          Related Products
        </h1>
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No related products found.
            </p>
          ) : (
            relatedProducts.map((p) => (
              <Productcard key={p._id} product={p} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
