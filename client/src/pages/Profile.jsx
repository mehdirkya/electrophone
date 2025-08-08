import Genbutton from "../components/Genbutton";
import Input from "../components/Input";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import OrdersList from "../components/OrdersList";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("profile"); // "profile" or "orders"

  // Profile states
  const [isEditingAccountInfo, setIsEditingAccountInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

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

  const [isAdmin, setIsAdmin] = useState(null); // boolean
  const [loadingProfile, setLoadingProfile] = useState(true);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editAddress) {
      setIsEditingAddressInfo(true);
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
        setEditedPhone(data.phone || "");

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

        setIsAdmin(!!data.isAdmin); // convert isAdmin from API to boolean
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const transitionClass = "transition-all duration-300 ease-in-out";
  const token = localStorage.getItem("token");

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row gap-6 px-4 py-10 max-w-7xl mx-auto">
      {/* Sidebar - hide if admin */}
      {!isAdmin && (
        <aside
          className={`md:w-60 w-full flex md:flex-col justify-around md:justify-start border rounded-lg p-4 shadow-sm
            ${transitionClass}`}
          key="sidebar"
          style={{
            opacity: 1,
            transform: "none",
          }}
        >
          <button
            onClick={() => setSelectedTab("profile")}
            className={`mb-4 text-left px-4 py-3 rounded-lg w-full font-semibold text-lg transition-colors
            ${selectedTab === "profile" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            Profile Settings
          </button>
          <button
            onClick={() => setSelectedTab("orders")}
            className={`mb-4 text-left px-4 py-3 rounded-lg w-full font-semibold text-lg transition-colors
            ${selectedTab === "orders" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            My Orders
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main
  className={`flex-1 overflow-auto max-w-full ${transitionClass} ${
    isAdmin ? "flex flex-col items-center" : ""
  }`}
  key="main-content"
>
  {selectedTab === "profile" && (
    <>
      {/* Admin Mode Indicator */}
      {isAdmin && (
        <div className="w-full max-w-3xl mb-6 px-4 py-2 bg-red-600 text-white font-bold rounded text-center select-none">
           ADMIN MODE ENABLED 
        </div>
      )}

      {/* Account Info Header */}
      <div
        className={`w-full max-w-3xl flex justify-between items-center px-2 mb-4 ${
          isAdmin ? "mx-auto" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          <img
            src="/personal-information.png"
            className="w-6 h-6"
            alt="Personal Information Icon"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <h1 className="text-[18px] font-semibold font-Inter select-none">
            Account Information:
          </h1>
        </div>
        <img
          src="/editicon.png"
          alt="edit"
          className="w-7 h-7 cursor-pointer active:scale-90 transition-transform ease-in-out"
          onClick={() => setIsEditingAccountInfo(true)}
          onMouseEnter={(e) => e.currentTarget.classList.add("scale-110")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("scale-110")}
        />
      </div>

      {/* Account Info Block */}
      <div
        className={`${transitionClass} w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center p-4 mb-6 ${
          isAdmin ? "mx-auto" : ""
        }`}
        style={{
          opacity: isEditingAccountInfo ? 1 : 0.95,
          transform: isEditingAccountInfo ? "scale(1.02)" : "scale(1)",
        }}
      >
              <div className="flex flex-col gap-6 w-full">
                {/* Email */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
                  <h1 className="font-inter font-semibold text-[18px] select-none sm:w-[120px] sm:text-right sm:pr-2">
                    Email:
                  </h1>
                  {isEditingAccountInfo ? (
                    <Input
                      value={email}
                      disabled
                      name="Email"
                      w="w-full"
                      className="focus:ring-2 focus:ring-blue-400 transition"
                    />
                  ) : (
                    <p className="select-text break-all">{email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
                  <h1 className="font-inter font-semibold text-[18px] select-none sm:w-[120px] sm:text-right sm:pr-2">
                    Password:
                  </h1>
                  {isEditingAccountInfo ? (
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="New Password"
                      w="w-full"
                      className="focus:ring-2 focus:ring-blue-400 transition"
                    />
                  ) : (
                    <p className="select-text">*********</p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
                  <h1 className="font-inter font-semibold text-[18px] select-none sm:w-[120px] sm:text-right sm:pr-2">
                    Phone:
                  </h1>
                  {isEditingAccountInfo ? (
                    <Input
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      name="Phone"
                      w="w-full"
                      className="focus:ring-2 focus:ring-blue-400 transition"
                    />
                  ) : (
                    <p className="select-text">{phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Save/Cancel */}
            <div
              className={`${transitionClass} flex flex-wrap justify-center gap-6 mt-4`}
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
                    onClick={async () => {
                      try {
                        const payload = { phone: editedPhone };
                        if (password) payload.password = password;

                        const res = await axios.put(
                          "http://localhost:5000/api/users/profile",
                          payload,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );

                        if (res.status === 200) {
                          setPhone(editedPhone);
                          setIsEditingAccountInfo(false);
                          setPassword("");
                        }
                      } catch (error) {
                        console.error("Failed to update account info:", error);
                      }
                    }}
                    className="hover:bg-gray-800 transition-colors"
                  />
                  <Genbutton
                    text="Cancel"
                    textco="text-black"
                    bg="bg-white"
                    textsz="text-[18px]"
                    w="w-[200px]"
                    h="h-[60px]"
                    onClick={() => {
                      setEditedPhone(phone);
                      setIsEditingAccountInfo(false);
                      setPassword("");
                    }}
                    className="hover:bg-gray-100 transition-colors"
                  />
                </>
              )}
            </div>

            {/* Billing Address - hide if admin */}
            {!isAdmin && (
              <>
                {/* Address Header */}
                <div className="w-full max-w-3xl flex justify-between items-center px-2 mb-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src="/addressicon.png"
                      className="w-6 h-6"
                      alt="Billing Address Icon"
                      style={{ transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <h1 className="text-[18px] font-semibold font-Inter select-none">Billing address:</h1>
                  </div>
                  <img
                    src="/editicon.png"
                    alt="edit"
                    className="w-6 h-6 cursor-pointer active:scale-90 transition-transform ease-in-out"
                    onClick={() => {
                      setIsEditingAddressInfo(true);
                      setEditedCountry(country);
                      setEditedAddress(address);
                      setEditedCity(city);
                      setEditedState(state);
                      setEditedZipCode(zipCode);
                    }}
                    onMouseEnter={(e) => e.currentTarget.classList.add("scale-110")}
                    onMouseLeave={(e) => e.currentTarget.classList.remove("scale-110")}
                  />
                </div>

                {/* Address Info Block */}
                <div
                  className={`${transitionClass} w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center p-4 mb-6`}
                  style={{
                    opacity: isEditingAddressInfo ? 1 : 0.95,
                    transform: isEditingAddressInfo ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div className="flex flex-col gap-6 w-full">
                    {[
                      ["Country", editedCountry, setEditedCountry, country],
                      ["Address", editedAddress, setEditedAddress, address],
                      ["City", editedCity, setEditedCity, city],
                      ["State", editedState, setEditedState, state],
                      ["Zip code", editedZipCode, setEditedZipCode, zipCode],
                    ].map(([label, value, setter, fallback], i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center"
                      >
                        <h1 className="font-inter font-semibold text-[18px] w-[100px] select-none">{label}:</h1>
                        {isEditingAddressInfo ? (
                          <Input
                            name={label}
                            type="text"
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            w="w-full"
                            className="font-inter font-normal text-[18px] border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-blue-400 transition"
                          />
                        ) : (
                          <p className="font-inter font-normal text-[18px] select-text">{fallback}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Address Save/Cancel or Logout/Leave */}
            <div className="flex flex-wrap justify-center gap-5 mt-6 px-2 max-w-3xl">
              {isEditingAddressInfo ? (
                <>
                  <Genbutton
                    text="Save"
                    textco="text-white"
                    bg="bg-black"
                    textsz="text-[18px]"
                    w="w-[260px]"
                    h="h-[60px]"
                    onClick={async () => {
                      try {
                        const payload = {
                          country: editedCountry.trim() || country,
                          address: editedAddress.trim() || address,
                          city: editedCity.trim() || city,
                          state: editedState.trim() || state,
                          zipCode: editedZipCode.trim() || zipCode,
                        };

                        const res = await axios.put(
                          "http://localhost:5000/api/users/profile",
                          payload,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );

                        if (res.status === 200) {
                          setCountry(payload.country);
                          setAddress(payload.address);
                          setCity(payload.city);
                          setState(payload.state);
                          setZipCode(payload.zipCode);
                          setIsEditingAddressInfo(false);
                        }
                      } catch (error) {
                        console.error(
                          "Failed to update address info:",
                          error.response?.data || error.message
                        );
                      }
                    }}
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
          </>
        )}

        {selectedTab === "orders" && <OrdersList token={token} />}
      </main>
    </div>
  );
}
