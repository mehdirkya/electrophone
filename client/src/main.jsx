import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // ✅ Import CartProvider
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
        <CartProvider> {/* ✅ Wrap App with CartProvider */}
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
