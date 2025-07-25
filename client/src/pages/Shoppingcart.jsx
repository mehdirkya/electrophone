import { useState } from "react";
import React from "react";
import Cartitem from "../components/cartitem";
import Genbutton from "../components/Genbutton";
export default function Shoppingcart() {
  

  return (
    <div className="w-full h-[700px] flex flex-col justify-center items-center">
        
        <div className="w-[1120px] h-[556px] flex justify-center items-center gap-5 ">
            
            <div className="flex-col flex gap-10">
                <h1 className="text-[24px] font-semibold font-Inter">Shopping Cart</h1>
                <Cartitem />
                <Cartitem />
                <Cartitem />
            </div>
            <div className="w-[500px] h-[420px] border border-[#d2d0d0] rounded-r-2xl flex justify-center items-center">
                <div className="flex flex-col gap-5">
                    <h1 className="text-[20px] font-bold font-Inter" >Order Summary</h1>
                    <div className="flex justify-between">
                        <p className="text-[18px] font-medium font-Inter">Subtotal</p>
                        <p className="text-[18px] font-medium font-Inter">$2347</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[18px] font-normal font-Inter">Estimated Tax</p>
                        <p className="text-[18px] font-medium font-Inter">$50</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[18px] font-normal font-Inter">Estimated shipping & Handling</p>
                        <p className="text-[18px] font-medium font-Inter">$29</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[18px] font-medium font-Inter">Total</p>
                        <p className="text-[18px] font-medium font-Inter">$2426</p>
                    </div>
                    <Genbutton h="h-[56px]" w="w-[350px]" text="Checkout" textco="text-white" textsz="text-[16px]" bg="bg-black" />
                </div>
                
                
            </div> 
      
        </div>
    </div>

  );
}
