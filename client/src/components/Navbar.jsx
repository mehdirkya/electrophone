import  { useContext, useEffect, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { token } = useContext(AuthContext);
  const userLink = token ? "/profile" : "/login";
  const [isOpen, setIsOpen] = useState(false);

  // 👇 Added state to trigger re-render on resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 shadow-inner-glass border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Electrophone Logo"
            className="w-[160px] md:w-[240px] object-contain transition-all duration-300"
          />
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-12 text-[16px] font-medium font-['Inter']">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/" state={{ scrollTo: "category" }} className="hover:text-blue-600 transition-colors">Category</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
        </nav>

        {/* Icons + Menu */}
        <div className="flex items-center gap-5 md:gap-6">
          <Link to={userLink}>
            <User className="w-6 h-6 md:w-7 md:h-7 text-black hover:text-blue-600 transition-colors" />
          </Link>
          <Link to="/shoppingcart">
            <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-black hover:text-blue-600 transition-colors" />
          </Link>
          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav - Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } px-6 bg-white/80 backdrop-blur-md`}
      >
        <nav className="flex flex-col gap-4 text-[15px] font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/" state={{ scrollTo: "category" }} className="hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
            Category
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
