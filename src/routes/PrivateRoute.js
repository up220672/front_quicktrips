import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, refreshToken } from "../utils/auth";
import Loading from "../components/atoms/Loading";

const PrivateRoute = ({ element }) => {
  const [authStatus, setAuthStatus] = useState("loading"); // "loading", "authenticated", "unauthenticated"

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();

      if (authenticated) {
        setAuthStatus("authenticated");
      } else {
        const refreshed = await refreshToken();
        setAuthStatus(refreshed ? "authenticated" : "unauthenticated");
      }
    };

    checkAuth();
  }, []);

  if (authStatus === "loading") {
    return <Loading message="Verificando autenticación..." />;
  }

  return authStatus === "authenticated" ? element : <Navigate to="/auth/login" />;
};

export default PrivateRoute;