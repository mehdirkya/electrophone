import Genbutton from "../components/Genbutton";
import Paymentcard from "../components/Payementcard";
import { useNavigate } from "react-router-dom";

export default function Payment(){
    const navigate = useNavigate();
    return (
        <section className="h-[1100px]">
            <div className="h-[72px] flex justify-center gap-3 items-center ">
                <img src="/Paymenticon.png" alt="" className="h-[24px] w-[24px]" />
                <h1 className="text-[19px] font-medium font-Inter">
                    Payment
                </h1>
            </div>
            <div className="h-[88%] flex justify-center items-center ">
                <div className="h-[948px] w-[1120px] flex flex-col items-center justify-start py-6 border-2 border-[#EBEBEB]">
                    <div>
                        <h1 className="font-Inter font-medium text-[20px] w-[95%]">Summary</h1>
                    <div className="flex-col flex gap-3">
                        <Paymentcard />
                        <Paymentcard />
                        <Paymentcard />
                    </div>
                    <div className="w-[1072px] h-[328px] flex flex-col gap-7">
                        <div>
                                <h2 className="font-Inter font-medium text-[14px] text-[#545454]">Address</h2>
                                <div className="flex justify-between items-center">
                                    <p className="font-Inter font-normal text-[16px]">1131 Dusty Townline, Jacksonville, TX 40322</p>
                                    <img src="editicon.png" alt="" className="w-[24px] h-[24px]" />
                                </div>
                            </div>
                            
                            <div className="flex justify-between" >
                                <h2 className="text-[#545454] font-Inter font-medium text-[14px]">Shipment method</h2>
                                <p className="font-Inter font-normal text-[16px]" >Free</p>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-Inter font-medium text-[16px]" >Subtotal</h1>
                                <p className="font-Inter font-medium text-[16px]">$2347</p>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-Inter font-normal text-[14px] text-[#545454]">Estimated shipping & Handling</h1>
                                <p className="font-Inter font-medium text-[16px] text-[#545454]">$29</p>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-Inter font-normal text-[14px] text-[#545454]">Estimated Tax</h1>
                                <p className="font-Inter font-medium text-[16px] text-[#545454]">$50</p>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-Inter font-medium text-[16px] ">Total</h2>
                                <p id="pricetotal" className="font-Inter font-bold text-[16px] ">$2426</p>
                            </div>
                            <div className="flex flex-col gap-15">
                                <h1 className="font-Inter font-bold text-[20px] text-center">Payment</h1>
                                <label className="flex items-center space-x-2 cursor-default select-none">
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="w-5 h-5 accent-black rounded-md"
                                    />
                                    <span className="text-black text-[16px] font-medium">Pay on delivery</span>
                                </label>
                                <div className="flex justify-center gap-5 items-center ">
                                    <Genbutton
                                        type="submit"
                                        w="w-[201px]"
                                        h="h-[64px]"
                                        bg="bg-black"
                                        text="Pay"
                                        textsz="text-sm"
                                        textco="text-white"
                                        hover="hover:bg-gray-900"
                                    />
                                    <Genbutton
                                        w="w-[201px]"
                                        h="h-[64px]"
                                        bg="bg-white"
                                        text="Back"
                                        textsz="text-[14px]"
                                        textco="text-black"
                                        hover="hover:bg-gray-100"
                                        onClick={() => navigate("/")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}