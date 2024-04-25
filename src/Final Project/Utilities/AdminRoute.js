import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userClient from "../Profile/client";

const AdminRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await userClient.profile(); // API call to check auth
        if (response?.role === "ADMIN") {
          setIsAuthenticated(true);
          console.log("Authenticated");
        } else {
          setIsAuthenticated(false);
          navigate("/Home");
          return;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/Home");
        return;
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
};
export default AdminRoute;
