import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Shoppingcart from "../pages/Shoppingcart";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-[111px]  shadow-sm bg-white flex items-center justify-center">
      <div className="w-[1440px] px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="cursor-pointer">
          <img
            src="/logo.png"
            alt="Electrophone Logo"
            className="w-[344px] h-[95px] object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="relative w-[372px] h-[56px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full pl-12 pr-4 border rounded-full bg-gray-100 text-sm focus:outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 text-sm font-medium font-['Inter']">
          <Link
            to="/"
            className="text-[20px] text-black opacity-100 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Home
          </Link>
          <Link
            to="/"
            state={{ scrollTo: "category" }}
            className="text-[20px] text-black opacity-100 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Category
          </Link>
          <Link
            to="/contact"
            className="text-[20px] forced-colors:black opacity-50 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Contact Us
          </Link>
          {/* Icons */}
        <div className="flex items-center gap-6">
          <User className="w-8 h-8 text-black cursor-pointer hover:scale-[1.1] transition-transform duration-200"  />
          <Link to="/shoppingcart">
            <ShoppingCart className="w-8 h-8 text-black cursor-pointer hover:scale-[1.1] transition-transform duration-200" />
          </Link>
        </div>
          
        </nav>

        
      </div>
    </header>
  );
}
