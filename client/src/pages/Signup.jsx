import React, { useState } from "react";
import Input from "../components/Input";
import Genbutton from "../components/Genbutton";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          phone,
          country,
          address,
          city,
          state,
          zipcode: zipCode
        }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-4 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <form className="flex flex-col gap-6 lg:gap-8" onSubmit={handleSubmit}>
          {/* Account Information Section */}
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-Inter">
              Account Information
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <Input
                name="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                w="w-full"
              />

              <Input
                name="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                w="w-full"
              />

              <Input
                name="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                w="w-full"
              />
            </div>
          </div>

          {/* Billing Address Section */}
          <div className="space-y-6 lg:space-y-8">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-Inter">
                Billing Address
              </h2>
              <img src="/addressicon.png" alt="" className="w-6 h-6" />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <Input
                name="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                w="w-full"
              />

              <Input
                name="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                w="w-full"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  name="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  w="w-full"
                />

                <Input
                  name="State"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter your state"
                  w="w-full"
                />
              </div>

              <Input
                name="Zip Code"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
                w="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-6">
            <Genbutton
              type="submit"
              w="w-full sm:w-[240px] lg:w-[280px]"
              h="h-14 sm:h-16 lg:h-18"
              bg="bg-black"
              text="Create Account"
              textsz="text-base sm:text-lg lg:text-xl"
              textco="text-white"
              hover="hover:bg-gray-900"
            />
            <Genbutton
              w="w-full sm:w-[240px] lg:w-[280px]"
              h="h-14 sm:h-16 lg:h-18"
              bg="bg-white"
              text="Already Have an account"
              textsz="text-base sm:text-lg lg:text-xl"
              textco="text-black"
              hover="hover:bg-gray-100"
              onClick={() => navigate("/login")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}