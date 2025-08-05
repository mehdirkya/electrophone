// src/components/Specs.jsx
import React from "react";

export default function Specs({ label, value, icon }) {
  return (
    <div className="flex-1 min-w-[150px] bg-[#F4F4F4] rounded-md flex items-center justify-center gap-3 p-2">
      <img src={icon} alt={label} className="w-[24px] h-[24px]" />
      <div className="flex flex-col">
        <h1 className="text-sm font-medium font-Inter text-[#A7A7A7]">{label}</h1>
        <p className="text-sm font-normal font-Inter">{value}</p>
      </div>
    </div>
  );
}
