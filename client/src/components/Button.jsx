import react from "react";

export default function Button({ bordercolor, textcolor, hovertext, hoverbg ,h,w}) {
  return (
    <button
      className={`
        w-[191px] h-[56px] border bg-transparent text-[16px] font-medium rounded
        transition-all duration-300 ease-in-out
        hover:border-transparent active:scale-95 cursor-pointer
        ${bordercolor} ${textcolor} ${hoverbg} ${hovertext}
      `}
    >
      Shop Now
    </button>
  );
}