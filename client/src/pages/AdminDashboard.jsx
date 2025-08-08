import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import EditProductForm from '../components/EditProductForm';
import AdminMessagesPage from "../components/AdminMessagesPage";
import AdminOrderList from '../components/AdminOrderList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [editProductId, setEditProductId] = useState(null);
  const { token } = useContext(AuthContext);

  const handleEdit = (id) => {
    setEditProductId(id);
    setActiveTab('edit');
  };

  const handleDone = () => {
    setEditProductId(null);
    setActiveTab('manage');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Responsive Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-5xl">
        <button
          onClick={() => { setActiveTab("products"); setEditProductId(null); }}
          className={`px-6 py-2 rounded-full font-medium shadow-md transition w-full sm:w-auto text-center 
            ${activeTab === "products" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"}`}
        >
          Add Product
        </button>
        <button
          onClick={() => { setActiveTab("manage"); setEditProductId(null); }}
          className={`px-6 py-2 rounded-full font-medium shadow-md transition w-full sm:w-auto text-center 
            ${activeTab === "manage" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"}`}
        >
          Manage Products
        </button>
        <button
          onClick={() => { setActiveTab("orders"); setEditProductId(null); }}
          className={`px-6 py-2 rounded-full font-medium shadow-md transition w-full sm:w-auto text-center 
            ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"}`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => { setActiveTab("messages"); setEditProductId(null); }}
          className={`px-6 py-2 rounded-full font-medium shadow-md transition w-full sm:w-auto text-center 
            ${activeTab === "messages" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"}`}
        >
          User Messages
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-5xl">
        {activeTab === "products" && <ProductForm token={token} onAdded={handleDone} />}
        {activeTab === "manage" && <ProductList token={token} onEdit={handleEdit} />}
        {activeTab === "edit" && <EditProductForm token={token} productId={editProductId} onUpdated={handleDone} />}
        {activeTab === "orders" && <AdminOrderList token={token} />}
        {activeTab === "messages" && <AdminMessagesPage token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
