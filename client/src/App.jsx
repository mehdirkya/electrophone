// src/App.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shoppingcart from "./pages/Shoppingcart";
import Productdetail from "./pages/Productdetail";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Accountinfoedit from "./components/Accountinfoedit";
import ThankYou from "./pages/ThankYou";
import AdminRoute from "./routes/Adminroute";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Shoppingcart" element={<Shoppingcart />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Accountinfoedit" element={<Accountinfoedit />} />
          <Route path="/ThankYou" element={<ThankYou />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

