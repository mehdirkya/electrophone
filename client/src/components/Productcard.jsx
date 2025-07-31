import Genbutton from "./Genbutton";

export default function Productcard(){
    return (
        <div className="w-[268px] bg-[#F6F6F6] h-[432px] flex-col flex justify-around items-center rounded-lg ">
            <br />
            <img src="/Iphone 14 pro.png" alt="" className="h-[160px] w-[130px] "/>
            <div className=" flex flex-col justify-around items-center gap-2">
                <p className="text-[20px] font-medium font-Inter text-center">Apple iPhone 14 Pro Max 128GB Deep Purple</p>
                <h2 className="text-[30px] font-semibold font-Inter  ">$900</h2>
                <Genbutton w="w-[188px]" h="h-[48px]" bg="bg-black" text="Buy Now" textsz="text-[14px]" textco="text-white" />
            </div>
        </div>
    );
}