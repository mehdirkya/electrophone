import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full py-6 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            className="w-[176px] h-[41px] object-contain"
            src="/FooterLogo.png"
            alt="Logo"
          />
        </div>

        {/* Description */}
        <p className="text-[14px] text-[#CFCFCF] max-w-md text-center lg:text-left">
          A phone and electronic seller located in Tunisia. Our boutique offers more than what you need.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5">
          {[
            { src: "/x.png", alt: "Twitter (X)", href: "https://twitter.com" },
            { src: "/Facebook.png", alt: "Facebook", href: "https://facebook.com" },
            { src: "/Tiktok.png", alt: "TikTok", href: "https://tiktok.com" },
            { src: "/Instagram.png", alt: "Instagram", href: "https://instagram.com" },
          ].map((icon, idx) => (
            <a
              key={idx}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="h-4 w-4 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 hover:drop-shadow"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
