// src/components/Specs.jsx
import React from "react";

export default function Specs({ label, value, icon }) {
  return (
    <div className="w-[168px] h-[64px] bg-[#F4F4F4] rounded-md flex items-center justify-center gap-3 p-2">
      <img src={icon} alt={label} className="w-[24px] h-[24px]" />
      <div className="flex flex-col">
        <h1 className="text-sm font-medium m-0 font-Inter text-[#A7A7A7]">{label}</h1>
        <p className="text-sm font-normal m-0 font-Inter">{value}</p>
      </div>
    </div>
  );
}
