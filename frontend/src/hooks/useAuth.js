import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/auth.js";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = API.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setIsAdmin(decoded.role === "admin");
        setIsSeller(decoded.role === "seller");
      } catch (error) {
        console.error("Failed to decode token", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsSeller(false);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const token = await API.login({ identifier: email, password });
      setIsAuthenticated(true);
      setIsAdmin(jwtDecode(token).role === "admin");
      setIsSeller(jwtDecode(token).role === "seller");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  const register = async (userData) => {
    try {
      const token = await API.register(userData);
      setIsAuthenticated(true);
      setIsAdmin(jwtDecode(token).role === "admin");
      setIsSeller(jwtDecode(token).role === "seller");
      navigate("/login");

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering user");
    }
  };

  const logout = () => {
    API.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSeller(false);
    navigate("/login");
  };

  return {
    isAuthenticated,
    isAdmin,
    isSeller,
    loading,
    login,
    register,
    logout,
  };
}
