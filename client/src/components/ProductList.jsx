import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ token, onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Product deleted');
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  if (loading) return <p className="text-center mt-8 text-lg">Loading products...</p>;
  if (products.length === 0) return <p className="text-center mt-8 text-lg">No products found.</p>;

  return (
    <div className="px-2 sm:px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Manage Products</h2>

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md border border-gray-300">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {['Image', 'Name', 'Brand', 'Price', 'Category', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="border-b border-gray-300 p-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-3 border-b border-gray-300">
                  {prod.imageUrl ? (
                    <div className="w-20 h-20 flex items-center justify-center rounded border overflow-hidden bg-white">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="p-3 border-b border-gray-300 text-sm font-medium">{prod.name}</td>
                <td className="p-3 border-b border-gray-300 text-sm">{prod.brand}</td>
                <td className="p-3 border-b border-gray-300 text-sm">${prod.price.toFixed(2)}</td>
                <td className="p-3 border-b border-gray-300 text-sm">{prod.category}</td>
                <td className="p-3 border-b border-gray-300">
                  <div className="flex items-center gap-2 h-full">
                    <button
                      onClick={() => onEdit(prod._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4"
          >
            <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center rounded border overflow-hidden bg-white">
              {prod.imageUrl ? (
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                  No image
                </div>
              )}
            </div>
            <div className="flex-grow space-y-1">
              <h3 className="font-semibold text-lg">{prod.name}</h3>
              <p className="text-sm text-gray-600">Brand: {prod.brand}</p>
              <p className="text-sm text-gray-600">Category: {prod.category}</p>
              <p className="text-sm font-semibold">${prod.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => onEdit(prod._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
