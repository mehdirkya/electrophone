// src/App.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminRoute from "./routes/AdminRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shoppingcart from "./pages/Shoppingcart";
import Productdetail from "./pages/Productdetail";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Products from "./pages/Products";


export default function App() {
  return (
    <div className="min-h-screen  overflow-x-hidden">
      <Navbar />
      <main >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Shoppingcart" element={<Shoppingcart/>} />
          <Route path="/Productdetail" element={<Productdetail/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/Payment" element={<Payment/>} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

