import React, { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import Dashboard from "../components/Dashboard";
import Login from "../pages/Login";

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwt_decode.default(token);
      if (decoded.role === "admin") setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    }
  }, []);

  if (!isAdmin) return <Login onLogin={() => setIsAdmin(true)} />;

  return <Dashboard />;
}
