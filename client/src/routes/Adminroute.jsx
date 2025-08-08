// src/routes/AdminRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const verifyAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Profile API response:", res.data);
      setIsAdmin(res.data.isAdmin);
    } catch (err) {
      console.error("Admin verify error:", err);
      if (err.response?.status === 403) {
        setIsAdmin(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (token) verifyAdmin();
  else setLoading(false);
}, [token]);


  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" state={{ from: 'admin' }} />;

  return children;
};

export default AdminRoute;