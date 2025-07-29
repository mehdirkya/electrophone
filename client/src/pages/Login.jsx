import React, { useState , useContext} from "react";
import Input from "../components/Input";
import Genbutton from "../components/Genbutton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const { login } = useContext(AuthContext);

  const width = "w-[573px]"

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // ✅ Parse once

    if (res.ok) {
      login(data.token); // ✅ Use the already-parsed token
      navigate("/");     // ✅ Redirect
    } else {
      console.error("Login failed:", data.message);
      alert(data.message);
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }
};

  return (
    <div className="h-[670px] w-full bg-white flex flex-col justify-center items-center px-6 py-12">
      <form className="flex-col flex  justify-center gap-25 items-center h-full" onSubmit={handleSubmit}>
          <label className="text-[30px] font-semibold font-Inter text-center">Login</label>

          <div className="flex flex-col gap-10">
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
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center items-center gap-5 mt-2">
            <Genbutton
              type="submit"
              w="w-[290px]"
              h="h-[64px]"
              bg="bg-black"
              text="Login"
              textsz="text-sm"
              textco="text-white"
              hover="hover:bg-gray-900"
            />
            <Genbutton
              w="w-[290px]"
              h="h-[64px]"
              bg="bg-white"
              text="Create Account"
              textsz="text-[14px]"
              textco="text-black"
              hover="hover:bg-gray-100"
              onClick={() => navigate("/signup")}
            />
          </div>
        </form>
    </div>
  );
}
