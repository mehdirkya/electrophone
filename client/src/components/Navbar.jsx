import React , { useContext } from "react";
import { ShoppingCart, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Check if user is logged in by checking token in localStorage
  const { token } = useContext(AuthContext);
  const userLink = token ? "/profile" : "/login";  

  return (
    <header className="sticky top-0 z-50 w-full h-[111px] shadow-sm bg-white flex items-center justify-around gap-60 ">
            <div className="flex justify-start">
              <Link to="/" className="cursor-pointer w-fit">
                <img
                  src="/logo.png"
                  alt="Electrophone Logo"
                  className="w-[344px] h-[95px] object-contain"
                />
              </Link> 
            </div>
          

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 text-sm font-medium font-['Inter'] w-[344px] ">
          <Link
            to="/"
            className="text-[18px] w-fit text-black opacity-100 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Home
          </Link>
          <Link
            to="/"
            state={{ scrollTo: "category" }}
            className="text-[18px] w-fit text-black opacity-100 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Category
          </Link>
          <Link
            to="/contact"
            className="text-[18px] w-fit forced-colors:black opacity-50 hover:opacity-70 transition-all duration-200 no-underline cursor-pointer hover:scale-[1.03]"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-6 w-[344px] justify-end">
          <Link to={userLink} className="w-fit">
            <User className="w-8 h-8  text-black cursor-pointer hover:scale-[1.1] transition-transform duration-200" />
          </Link>
          <Link to="/shoppingcart" className="w-fit">
            <ShoppingCart className="w-8 h-8 text-black cursor-pointer hover:scale-[1.1] transition-transform duration-200" />
          </Link>
        </div>

        
    </header>
  );
}
