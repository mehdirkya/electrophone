import { useState } from "react";
import Specs from "../components/specs";
import Genbutton from "../components/Genbutton";
import Randomcomp from "../components/randomcomp";
import Productcart from "../components/Productcart";

export default function Productdetail() {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    "Enhanced capabilities thanks to an enlarged 6.7-inch display and all-day battery life without the need for recharging. Capture incredible photos in both low light and bright conditions using the new advanced dual-camera system.";
  const fullText =
    "Enhanced capabilities thanks to an enlarged 6.7-inch display and all-day battery life without the need for recharging. Capture incredible photos in both low light and bright conditions using the new advanced dual-camera system. With improved image processing, sharper details, and more vibrant colors, every shot feels professional. Experience smooth performance, stunning visuals, and pro-level features in the palm of your hand.";

  return (
    <div>
        <div className="h-[800px] w-full flex justify-center items-center">
            <div className="w-[80%] flex justify-center gap-20 items-center">
                <img src="/Iphone 14 pro.png" alt="" className="w-[413px] h-[516px]" />
                <div className="flex-col flex gap-10">
                <div>
                    <h1 id="productname" className="text-[30px] font-bold font-Inter">
                    Apple iPhone 14 Pro Max
                    </h1>
                    <h2 id="price" className="text-[25px] font-medium font-Inter">
                    $1399
                    </h2>
                </div>
                <div className="w-[536px] flex-col flex justify-center gap-10">
                    <div className="grid grid-cols-3 gap-4 max-w-fit">
                    <Specs />
                    <Specs />
                    <Specs />
                    <Specs />
                    <Specs />
                    <Specs />
                    </div>

                    <p className="text-gray-700">
                    {expanded ? fullText : shortText}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-2 text-black underline hover:text-blue-600 transition-colors"
                    >
                        {expanded ? "less..." : "more..."}
                    </button>
                    </p>

                    <Genbutton
                    w="w-full"
                    h="h-[64px]"
                    bg="bg-black"
                    text="Add to Card"
                    textsz="text-sm"
                    textco="text-white"
                    hover="hover:bg-gray-900"
                    />
                    <div className="flex gap-8">
                    <Randomcomp text1="Free Delivery" text2="1-2 day" img="delivery.png" />
                    <Randomcomp text1="In Stock" text2="Today" img="shopicon.png" />
                    <Randomcomp text1="Guaranteed" text2="1 year" img="delivery.png" />
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="h-[656px]  flex-col flex items-center">
            <div className="flex flex-col gap-7">
                <h1 className="font-Inter font-medium text-[24px]">Related Products</h1>
                <div className="flex justify-center items-center gap-4">      
                    <Productcart />
                    <Productcart />
                    <Productcart />
                    <Productcart />
                </div>
            </div>
        </div>
    </div>
    
  );
}
