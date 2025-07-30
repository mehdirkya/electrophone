import { useNavigate } from "react-router-dom";
import Genbutton from "../components/Genbutton";
import Input from "../components/Input";
import React, { useState , useContext , useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


export default function Profile(){
    
    const [isEditingAccountInfo, setIsEditingAccountInfo] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [phone, setPhone] = useState("");
      const [country, setCountry] = useState("");
      const [address, setAddress] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zipCode, setZipCode] = useState("");
      const navigate = useNavigate();
      const handleLogout = () => {
  logout(); // from AuthContext
  navigate("/login"); // redirect after logout
};
      
    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // or from AuthContext if stored there

      if (!token) {
        console.warn("No token found");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

      const data = res.data;

      // Fill states from data
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setCountry(data.country || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setState(data.state || "");
      setZipCode(data.zipCode || "");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  fetchProfile();
}, []);

    
      // Handlers for each input
      const handleEmailChange = (e) => setEmail(e.target.value);
      const handlePasswordChange = (e) => setPassword(e.target.value);
      const handlePhoneChange = (e) => setPhone(e.target.value);
      const handleCountryChange = (e) => setCountry(e.target.value);
      const handleAddressChange = (e) => setAddress(e.target.value);
      const handleCityChange = (e) => setCity(e.target.value);
      const handleStateChange = (e) => setState(e.target.value);
      const handleZipCodeChange = (e) => setZipCode(e.target.value);

    const { user, logout } = useContext(AuthContext);

    
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // or from context
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      setEmail(data.email);
      setPhone(data.phone);
      setCountry(data.country);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setZipCode(data.zipCode);
      // Password should not come from API directly
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, []);


    return(
        <div className="h-[1500px] w-full bg-white flex flex-col justify-center items-center  gap-6">
            <div className="w-[40%] flex justify-between ">
                <div className="flex gap-3">   
                    <img src="/personal-information.png" className="w-[24px] h-[24px]" alt="" />
                    <h1 className="text-[18px] font-semibold font-Inter ">  Account Information : </h1> 
                </div>
                <img src="/editicon.png" alt="edit" className="w-[28px] h-[28px] cursor-pointer active:scale-90 transition ease-in-out" onClick={() => setIsEditingAccountInfo(true)}/>

            </div>
            {/* Account Information Block */}
            <div className="w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center">
                    <div className="flex h-[350px] gap-5 w-[600px]">
                        {/* Left column: Labels */}
                        <div className="flex flex-col justify-around w-[fit] h-full">
                            <h1 className="font-inter font-semibold text-[20px] h-[60px]">Email :</h1>
                            <h1 className="font-inter font-semibold text-[20px] h-[60px]">Password :</h1>
                            <h1 className="font-inter font-semibold text-[20px] h-[60px]">Phone :</h1>
                        </div>
                          

                    <div className="flex flex-col justify-around w-[300px] h-full">
                    {/* Always show email (non-editable) */}
                    <p className="font-inter font-normal text-[18px] h-[60px]" id="email">{email}</p>

                    {isEditingAccountInfo ? (
                        <>
                        {/* Editable Fields */}
                        <Input
                            w="w-[300px]"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            name="New Password"
                        />
                        <Input
                            w="w-[300px]"
                            value={phone}
                            onChange={handlePhoneChange}
                            name="Phone"
                        />
                        </>
                    ) : (
                        <>
                        <p className="font-inter font-normal text-[18px] h-[60px]" id="password">********</p>
                        <p className="font-inter font-normal text-[18px] h-[60px]" id="phone">{phone}</p>
                        </>
                    )}
                    </div>

                </div>
            </div>
            {isEditingAccountInfo && (
                <div className="flex gap-6 mt-4">
                    <Genbutton
                    text="Save"
                    textco="text-white"
                    bg="bg-black"
                    textsz="text-[18px]"
                    w="w-[200px]"
                    h="h-[60px]"
                    // You'll implement this
                    />
                    <Genbutton
                    text="Cancel"
                    textco="text-black"
                    bg="bg-white"
                    textsz="text-[18px]"
                    w="w-[200px]"
                    h="h-[60px]"
                    onClick={() => setIsEditingAccountInfo(false)}
                    />
                </div>
            )}
            <div className="w-[40%] flex justify-between">
                <div className="flex gap-3">
                    <img src="/addressicon.png" className="w-[24px] h-[24px]" alt="" />
                    <h1 className="text-[18px] font-semibold font-Inter ">  Billing address : </h1>
                </div>
                <img src="/editicon.png" alt="edit" className="w-[24px] h-[24px] cursor-pointer active:scale-90 transition ease-in-out" />
            </div>
            <div className="w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center">
                <div className="flex  h-[460px]  gap-5 w-[600px] ">
                    {/* Left column: Labels */}
                    <div className="flex flex-col justify-around w-fit h-full">
                        <h1 className="font-inter font-semibold text-[20px]">Country :</h1>
                        <h1 className="font-inter font-semibold text-[20px]">Address :</h1>
                        <h1 className="font-inter font-semibold text-[20px]">City :</h1>
                        <h1 className="font-inter font-semibold text-[20px]">State :</h1>
                        <h1 className="font-inter font-semibold text-[20px]">Zip code :</h1>
                    </div>

                    {/* Right column: Values */}
                    <div className="flex flex-col justify-around w-fit h-full">
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                        <p className="font-inter font-normal text-[18px]" id="address">{address}</p>
                        <p className="font-inter font-normal text-[18px]" id="city">{city}</p>
                        <p className="font-inter font-normal text-[18px]" id="state">{state}</p>
                        <p className="font-inter font-normal text-[18px]" id="zipcode">{zipCode}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                <Genbutton text="Logout" textco="text-white" bg="bg-black"  textsz="text-[18px]" w="w-[260px]" h="h-[60px]" onClick={handleLogout}/>
                <Genbutton text="Leave" textco="text-black" bg="bg-white"  textsz="text-[18px]" w="w-[260px]" h="h-[60px]"  onClick={() => navigate("/")}/>
            </div>
            
        </div>

    );
}