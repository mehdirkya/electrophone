import React from "react";

export default function Footer() {
  return (
    <footer className="h-[112px] w-full bg-black flex justify-around  items-center px-16">
      {/* Logo */}
      <div>
        <img className="w-[176px] h-[41px]" src="/FooterLogo.png" alt="Logo" />
      </div>

      {/* Description */}
      <p className="text-[14px] text-[#CFCFCF] max-w-[400px] text-center">
        A phone and electronic seller located in Tunisia. Our boutique offers more than what you need.
      </p>

      {/* Social Icons */}
        <div className="flex justify-center items-center gap-5">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img
                src="/x.png"
                alt="Twitter (X)"
                className="h-4 w-4 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 hover:drop-shadow"
                />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                src="/Facebook.png"
                alt="Facebook"
                className="h-4 w-4 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 hover:drop-shadow"
                />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <img
                src="/Tiktok.png"
                alt="TikTok"
                className="h-4 w-4 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 hover:drop-shadow"
                />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                src="/Instagram.png"
                alt="Instagram"
                className="h-4 w-4 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 hover:drop-shadow"
                />
            </a>
        </div>

    </footer>
  );
}
