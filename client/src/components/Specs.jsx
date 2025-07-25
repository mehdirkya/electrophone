import react from "react";
export default function Specs(){
    return(
        <div className="w-[168px] h-[64px] bg-[#F4F4F4] rounded-md flex items-center gap-3">
            <img src="/Screensize.png" alt="" className="w-[24px] h-[24px]"/>
            <div className="flex flex-col">
                <h1 className="text-sm font-medium m-0 font-Inter text-[#A7A7A7]">Screen Size</h1>
                <p className="text-sm font-normal m-0 font-Inter">6.7"</p>
            </div>
        </div>
    );
    
}