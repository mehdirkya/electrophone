import Specs from "../components/specs";
import Genbutton from "../components/Genbutton";

export default function Productdetail(){
    return(
        <div className="h-[700px] flex justify-center items-center gap-15">
            <img src="/Iphone 14 pro.png" alt="" className="w-[413px] h-[516px]" />
            <div className="flex-col flex gap-7">
                <div>
                    <h1 id="productname" className="text-[30px] font-bold font-Inter">Apple iPhone 14 Pro Max</h1>
                    <h2 id="price" className="text-[25px] font-medium font-Inter">$1399</h2>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4 max-w-fit">
                        <Specs/>
                        <Specs/>
                        <Specs/>
                        <Specs/>
                        <Specs/>
                        <Specs/>
                    </div>
                    
                    <p>
                        Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras more...
                    </p>
                    <Genbutton w="w-[290px]" h="h-[64px]" bg="bg-black" text="Login" textsz="text-sm" textco="text-white" hover="hover:bg-gray-900"/>
                    
                </div>
            </div>
                
            
        </div>
    );
}