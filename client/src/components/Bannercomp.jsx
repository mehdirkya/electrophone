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
  category,
  brand
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

  const targetLink = category && brand 
    ? `/products/${category}?brand=${brand}` 
    : "#";

  return (
    <div className={`flex-1 min-w-[260px] max-w-full ${bgcolor}`}>
      <img 
        src={img} 
        alt={label} 
        className="w-full h-auto object-contain"
      />
      <div className={`font-inter flex-col flex justify-start items-center gap-5 p-4`}>
        <h3 className={`text-[33px] font-normal ${labelcolor}`}>{label}</h3>
        <p className={`text-[14px] h-[72px] w-[90%] font-medium ${desccolor}`}>{desc}</p>
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
