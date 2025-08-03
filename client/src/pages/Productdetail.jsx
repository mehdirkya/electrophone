import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Specs from "../components/specs";
import Genbutton from "../components/Genbutton";
import Randomcomp from "../components/randomcomp";
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
          .catch((err) => console.error("Error fetching related products:", err));
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
    <div>
      {/* Product detail section */}
      <div className="h-[800px] w-full flex justify-center items-center">
        <div className="w-[80%] flex justify-center gap-20 items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-[516px]"
          />
          <div className="flex-col flex gap-10">
            <div>
              <h1 id="productname" className="text-[30px] font-bold font-Inter">
                {product.name}
              </h1>
              <h2 id="price" className="text-[25px] font-medium font-Inter">
                ${product.price}
              </h2>
            </div>

            <div className="w-[536px] flex-col flex justify-center gap-10">
              <div className="grid grid-cols-3 gap-4 max-w-fit">
                {(product.specs || []).map((spec, index) => (
                  <Specs
                    key={index}
                    label={spec.label}
                    value={spec.value}
                    icon={spec.icon}
                  />
                ))}
              </div>

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

              <div className="flex gap-8">
                <Randomcomp
                  text1="Free Delivery"
                  text2="1-2 day"
                  img="/delivery.png"
                />
                <Randomcomp
                  text1="In Stock"
                  text2={product.inStock ? "Today" : "Out"}
                  img="/shopicon.png"
                />
                <Randomcomp
                  text1="Guaranteed"
                  text2="1 year"
                  img="/delivery.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="h-[656px] flex-col flex items-center">
        <div className="flex flex-col gap-7">
          <h1 className="font-Inter font-medium text-[24px]">
            Related Products
          </h1>
          <div className="flex justify-center items-center gap-4">
            {relatedProducts.length === 0 ? (
              <p className="text-gray-500">No related products found.</p>
            ) : (
              relatedProducts.map((p) => (
                <Productcard key={p._id} product={p} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
