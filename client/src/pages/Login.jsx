import React, { useState, useContext } from "react";
import Input from "../components/Input";
import Genbutton from "../components/Genbutton";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token);
        navigate(from, { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <form 
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-center gap-8 lg:gap-10" 
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-Inter text-center">
          Login
        </h1>

        <div className="w-full flex flex-col gap-6 lg:gap-8">
          {/* Email */}
          <Input
            name="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            w="w-full"
            className="text-base sm:text-lg lg:text-xl"
            inputHeight="h-14 sm:h-16 lg:h-18"
          />

          {/* Password */}
          <Input
            name="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            w="w-full"
            className="text-base sm:text-lg lg:text-xl"
            inputHeight="h-14 sm:h-16 lg:h-18"
          />
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-6">
          <Genbutton
            type="submit"
            w="w-full sm:w-[220px] lg:w-[240px]"
            h="h-14 sm:h-16 lg:h-18"
            bg="bg-black"
            text="Login"
            textsz="text-base sm:text-lg lg:text-xl"
            textco="text-white"
            hover="hover:bg-gray-900"
          />
          <Genbutton
            w="w-full sm:w-[220px] lg:w-[240px]"
            h="h-14 sm:h-16 lg:h-18"
            bg="bg-white"
            text="Create Account"
            textsz="text-base sm:text-lg lg:text-xl"
            textco="text-black"
            hover="hover:bg-gray-100"
            onClick={() => navigate("/signup")}
          />
        </div>
      </form>
    </div>
  );
}