import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userClient from "../Profile/client";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await userClient.profile(); // API call to check auth
        if (response) {
          setIsAuthenticated(true);
          console.log("Authenticated");
        } else {
          setIsAuthenticated(false);
          navigate("/Main/Login");
          return;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/Main/Login");
        return;
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
};
export default ProtectedRoute;
