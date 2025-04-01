import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Cambia esto por tu lógica real de autenticación

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
