import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../ContextAndHooks/AuthContext";

export default function ProtectedRoute() {
  const { setToken, setIsLogin } = useAuth();
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const currentDate = new Date().getTime();

  useEffect(() => {
    // Check the user's login status
    if (tokenExpiry && currentDate < parseInt(tokenExpiry, 10)) {
      // Token is still valid
      setToken(token);
      setIsLogin(true);
    } else {
      // Token has expired or not found
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    }
  }, []);

  if (!token || !tokenExpiry) {
    return <Navigate to="/landingpage" replace />;
    // return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
