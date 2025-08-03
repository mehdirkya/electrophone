import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Bannercomp({
  label,
  desc,
  labelcolor,
  desccolor,
  bgcolor,
  bgcolordesc,
  img,
  category,     // ✅ Add this
  brand         // ✅ Add this
}) {
  const buttonStyles = bgcolordesc === "white" 
    ? {
        bordercolor: "border-black",
        textcolor: "text-black",
        hovertext: "hover:text-white",
        hoverbg: "hover:bg-black"
      }
    : {
        bordercolor: "border-white",
        textcolor: "text-white",
        hovertext: "hover:text-black",
        hoverbg: "hover:bg-white"
      };

  // ✅ Construct URL with query param for brand
  const targetLink = category && brand 
    ? `/products/${category}?brand=${brand}` 
    : "#";

  return (
    <div className={`h-full ${bgcolor} w-[360px]`}>
      <img 
        src={img} 
        alt={label} 
        className="w-[360px] h-[366px] object-cover"
      />
      <div className={`font-inter flex-col flex justify-start items-center gap-5 p-4`}>
        <h3 className={`text-[33px] font-normal ${labelcolor}`}>{label}</h3>
        <p className={`text-[14px] h-[72px] w-[296px] font-medium ${desccolor}`}>{desc}</p>
        <Link to={targetLink}>
          <Button 
            bordercolor={buttonStyles.bordercolor}
            textcolor={buttonStyles.textcolor}
            hovertext={buttonStyles.hovertext}
            hoverbg={buttonStyles.hoverbg}
            h="56px" 
            w="191px" 
          />
        </Link>
      </div>
    </div>
  );
}
