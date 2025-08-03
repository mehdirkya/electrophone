import Genbutton from "../components/Genbutton";
import Input from "../components/Input";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export default function Profile() {
  const [isEditingAccountInfo, setIsEditingAccountInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [isEditingAddressInfo, setIsEditingAddressInfo] = useState(false);
  const [editedCountry, setEditedCountry] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedState, setEditedState] = useState("");
  const [editedZipCode, setEditedZipCode] = useState("");

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editAddress) {
      setIsEditingAddressInfo(true);
      // initialize edited fields from existing ones to avoid empty inputs
      setEditedCountry(country);
      setEditedAddress(address);
      setEditedCity(city);
      setEditedState(state);
      setEditedZipCode(zipCode);
    }
  }, [location.state, country, address, city, state, zipCode]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.warn("No token found");

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;

        setEmail(data.email || "");
        setPhone(data.phone || "");
        setCountry(data.country || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setState(data.state || "");
        setZipCode(data.zipCode || "");

        setEditedCountry(data.country || "");
        setEditedAddress(data.address || "");
        setEditedCity(data.city || "");
        setEditedState(data.state || "");
        setEditedZipCode(data.zipCode || "");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveAccountInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { phone };
      if (password) payload.password = password;

      const res = await axios.put("http://localhost:5000/api/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setIsEditingAccountInfo(false);
        setPassword("");
      }
    } catch (error) {
      console.error("Failed to update account info:", error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        country: editedCountry.trim() || country,
        address: editedAddress.trim() || address,
        city: editedCity.trim() || city,
        state: editedState.trim() || state,
        zipCode: editedZipCode.trim() || zipCode,
      };

      const res = await axios.put("http://localhost:5000/api/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setCountry(payload.country);
        setAddress(payload.address);
        setCity(payload.city);
        setState(payload.state);
        setZipCode(payload.zipCode);
        setIsEditingAddressInfo(false);
      }
    } catch (error) {
      console.error("Failed to update address info:", error.response?.data || error.message);
    }
  };

  // Tailwind class for smooth fade and scale transition container
  const transitionClass = "transition-all duration-300 ease-in-out";

  return (
    <div className="h-[1300px] w-full bg-white flex flex-col justify-center items-center gap-10">
      {/* Account Info Header */}
      <div className="w-[40%] flex justify-between">
        <div className="flex gap-3 items-center">
          <img
            src="/personal-information.png"
            className="w-[24px] h-[24px]"
            alt=""
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <h1 className="text-[18px] font-semibold font-Inter select-none">Account Information :</h1>
        </div>
        <img
          src="/editicon.png"
          alt="edit"
          className="w-[28px] h-[28px] cursor-pointer active:scale-90 transition-transform ease-in-out"
          onClick={() => setIsEditingAccountInfo(true)}
          onMouseEnter={e => e.currentTarget.classList.add("scale-110")}
          onMouseLeave={e => e.currentTarget.classList.remove("scale-110")}
        />
      </div>

      {/* Account Info Block */}
      <div
        className={`${transitionClass} w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center`}
        style={{
          opacity: isEditingAccountInfo ? 1 : 0.95,
          transform: isEditingAccountInfo ? "scale(1.02)" : "scale(1)",
        }}
      >
        <div className="flex h-[350px] gap-5 w-[600px]">
          <div className="flex flex-col justify-around w-fit h-full">
            {/* Email (disabled editing) */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Email :</h1>
              {isEditingAccountInfo ? (
                <Input
                  value={email}
                  disabled
                  name="Email"
                  w="w-[500px]"
                  className="focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="select-text">{email}</p>
              )}
            </div>

            {/* Password (editable when editing) */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Password :</h1>
              {isEditingAccountInfo ? (
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  name="New Password"
                  w="w-[500px]"
                  className="focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="select-text">*********</p>
              )}
            </div>

            {/* Phone (editable when editing) */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Phone :</h1>
              {isEditingAccountInfo ? (
                <Input
                  value={phone}
                  onChange={handlePhoneChange}
                  name="Phone"
                  w="w-[500px]"
                  className="focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="select-text">{phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account info save/cancel buttons */}
      <div
        className={`${transitionClass} flex gap-6 mt-4`}
        style={{
          opacity: isEditingAccountInfo ? 1 : 0,
          height: isEditingAccountInfo ? "auto" : 0,
          overflow: "hidden",
        }}
      >
        {isEditingAccountInfo && (
          <>
            <Genbutton
              text="Save"
              textco="text-white"
              bg="bg-black"
              textsz="text-[18px]"
              w="w-[200px]"
              h="h-[60px]"
              onClick={handleSaveAccountInfo}
              className="hover:bg-gray-800 transition-colors"
            />
            <Genbutton
              text="Cancel"
              textco="text-black"
              bg="bg-white"
              textsz="text-[18px]"
              w="w-[200px]"
              h="h-[60px]"
              onClick={() => setIsEditingAccountInfo(false)}
              className="hover:bg-gray-100 transition-colors"
            />
          </>
        )}
      </div>

      {/* Address Header */}
      <div className="w-[40%] flex justify-between">
        <div className="flex gap-3 items-center">
          <img
            src="/addressicon.png"
            className="w-[24px] h-[24px]"
            alt=""
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <h1 className="text-[18px] font-semibold font-Inter select-none">Billing address:</h1>
        </div>
        <img
          src="/editicon.png"
          alt="edit"
          className="w-[24px] h-[24px] cursor-pointer active:scale-90 transition-transform ease-in-out"
          onClick={() => {
            setIsEditingAddressInfo(true);
            setEditedCountry(country);
            setEditedAddress(address);
            setEditedCity(city);
            setEditedState(state);
            setEditedZipCode(zipCode);
          }}
          onMouseEnter={e => e.currentTarget.classList.add("scale-110")}
          onMouseLeave={e => e.currentTarget.classList.remove("scale-110")}
        />
      </div>

      {/* Address Info Block */}
      <div
        className={`${transitionClass} w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center`}
        style={{
          opacity: isEditingAddressInfo ? 1 : 0.95,
          transform: isEditingAddressInfo ? "scale(1.02)" : "scale(1)",
        }}
      >
        <div className="flex h-[490px] gap-5 w-[600px]">
          <div className="flex flex-col justify-around w-fit h-full">
            {/* Country */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Country :</h1>
              {isEditingAddressInfo ? (
                <Input
                  name={"Country"}
                  w="w-[520px]"
                  type="text"
                  value={editedCountry}
                  onChange={(e) => setEditedCountry(e.target.value)}
                  className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded w-[300px] focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="font-inter font-normal text-[18px] select-text" id="country">
                  {country}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Address :</h1>
              {isEditingAddressInfo ? (
                <Input
                  name={"Address"}
                  w="w-[520px]"
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded w-[300px] focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="font-inter font-normal text-[18px] select-text" id="address">
                  {address}
                </p>
              )}
            </div>

            {/* City */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">City :</h1>
              {isEditingAddressInfo ? (
                <Input
                  name={"City"}
                  w="w-[520px]"
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                  className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded w-[300px] focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="font-inter font-normal text-[18px] select-text" id="city">
                  {city}
                </p>
              )}
            </div>

            {/* State */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">State :</h1>
              {isEditingAddressInfo ? (
                <Input
                  name={"State"}
                  w="w-[520px]"
                  type="text"
                  value={editedState}
                  onChange={(e) => setEditedState(e.target.value)}
                  className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded w-[300px] focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="font-inter font-normal text-[18px] select-text" id="state">
                  {state}
                </p>
              )}
            </div>

            {/* Zip code */}
            <div className="flex gap-6 items-center">
              <h1 className="font-inter font-semibold text-[20px] w-[100px] select-none">Zip code :</h1>
              {isEditingAddressInfo ? (
                <Input
                  name={"Zip code"}
                  w="w-[520px]"
                  type="text"
                  value={editedZipCode}
                  onChange={(e) => setEditedZipCode(e.target.value)}
                  className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded w-[300px] focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <p className="font-inter font-normal text-[18px] select-text" id="zipcode">
                  {zipCode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address save/cancel buttons or Logout/Leave buttons */}
      <div className="flex gap-5">
        {isEditingAddressInfo ? (
          <>
            <Genbutton
              text="Save"
              textco="text-white"
              bg="bg-black"
              textsz="text-[18px]"
              w="w-[260px]"
              h="h-[60px]"
              onClick={handleSaveAddress}
              className="hover:bg-gray-800 transition-colors"
            />
            <Genbutton
              text="Cancel"
              textco="text-black"
              bg="bg-white"
              textsz="text-[18px]"
              w="w-[260px]"
              h="h-[60px]"
              onClick={() => {
                setIsEditingAddressInfo(false);
                setEditedCountry(country);
                setEditedAddress(address);
                setEditedCity(city);
                setEditedState(state);
                setEditedZipCode(zipCode);
              }}
              className="hover:bg-gray-100 transition-colors"
            />
          </>
        ) : (
          <>
            <Genbutton
              text="Logout"
              textco="text-white"
              bg="bg-black"
              textsz="text-[18px]"
              w="w-[260px]"
              h="h-[60px]"
              onClick={handleLogout}
              className="hover:bg-gray-800 transition-colors"
            />
            <Genbutton
              text="Leave"
              textco="text-black"
              bg="bg-white"
              textsz="text-[18px]"
              w="w-[260px]"
              h="h-[60px]"
              onClick={() => navigate("/")}
              className="hover:bg-gray-100 transition-colors"
            />
          </>
        )}
      </div>
    </div>
  );
}
