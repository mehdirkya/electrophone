import React from "react";

export default function Textarea({ value, onChange }) {
  return (
    <div className="relative w-[786px] h-[150px]">
      {/* Centered Placeholder */}
      {value === "" && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none font-Inter">
          Enter your message
        </div>
      )}

      <textarea
        name="Message"
        value={value}
        onChange={onChange}
        className="w-full h-full border border-gray-300 px-4 py-3 rounded-lg resize-none font-Inter focus:outline-none focus:ring-2 focus:ring-black bg-transparent z-10"
      />
    </div>
  );
}
