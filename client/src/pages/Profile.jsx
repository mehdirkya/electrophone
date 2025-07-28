import { useNavigate } from "react-router-dom";
import Genbutton from "../components/Genbutton";
import Input from "../components/Input";
import React, { useState } from "react";

export default function Profile(){

    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [phone, setPhone] = useState("");
      const [country, setCountry] = useState("");
      const [address, setAddress] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zipCode, setZipCode] = useState("");
      const navigate = useNavigate();
    
    
      // Handlers for each input
      const handleEmailChange = (e) => setEmail(e.target.value);
      const handlePasswordChange = (e) => setPassword(e.target.value);
      const handlePhoneChange = (e) => setPhone(e.target.value);
      const handleCountryChange = (e) => setCountry(e.target.value);
      const handleAddressChange = (e) => setAddress(e.target.value);
      const handleCityChange = (e) => setCity(e.target.value);
      const handleStateChange = (e) => setState(e.target.value);
      const handleZipCodeChange = (e) => setZipCode(e.target.value);

    const width = "w-[786px]";

    return(
        <div className="h-[900px] w-full bg-white flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-3xl">
            <form className="flex-col flex gap-6">
                <label htmlFor="" className="text-[18px] font-semibold font-Inter">Account Infomration</label>
                <div className="flex flex-col gap-3">
                {/* Email */}
                <Input
                    name="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    w={width}
                />
    
                {/* Password */}
                <Input
                    name="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    w={width}
                />
    
                {/* Phone */}
                <Input
                    name="Phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    w={width}
                />
                </div>
                <div className="flex gap-2">
                <label htmlFor="" className="text-[18px] font-semibold font-Inter">Billing Address</label>
                <img src="/addressicon.png" alt="" />
                </div>
                <div className="flex flex-col gap-3">
                {/* Country */}
                <Input
                    name="Country"
                    type="text"
                    value={country}
                    onChange={handleCountryChange}
                    placeholder="Enter your country"
                    w={width}
                />
    
                {/* Address */}
                <Input
                    name="Address"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter your address"
                    w={width}
                />
    
                {/* City */}
                <Input
                    name="City"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter your city"
                    w={width}
                />
    
                {/* State */}
                <Input
                    name="State"
                    type="text"
                    value={state}
                    onChange={handleStateChange}
                    placeholder="Enter your state"
                    w={width}
                />
    
                {/* Zip Code */}
                <Input
                    name="Zip Code"
                    type="text"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    placeholder="Enter your zip code"
                    w={width}
                />
                </div>
                {/* Buttons */}
                <div className="w-full flex justify-center items-center gap-5">
                <Genbutton
                    type="submit"
                    w="w-[290px]"
                    h="h-[64px]"
                    bg="bg-black"
                    text="Change"
                    textsz="text-sm"
                    textco="text-white"
                    hover="hover:bg-gray-900"
                />
                <Genbutton
                    w="w-[290px]"
                    h="h-[64px]"
                    bg="bg-white"
                    text="Leave"
                    textsz="text-[14px]"
                    textco="text-black"
                    hover="hover:bg-gray-100"
                    onClick={() => navigate("/")}
                />
                </div>
            </form>
            </div>
        </div>
    );
}