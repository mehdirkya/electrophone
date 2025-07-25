// src/components/CategoryCard.jsx
import React from "react";

export default function CategoryCard({ image, label }) {
  return (
    <div className="w-[160px] h-[128px] bg-[#EDEDED] text-black rounded-2xl flex flex-col items-center justify-center gap-2 hover:drop-shadow hover:scale-105 transition-all duration-200 ease-in-out active:scale-95 cursor-pointer">
      <img src={image} alt={label} />
      <p className="text-[16px] font-medium font-inter">{label}</p>
    </div>
  );
}
