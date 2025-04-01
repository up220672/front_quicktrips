import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, isEmailConfirmed } from "../utils/auth";

import HomePage from "../components/pages/Home";
import LoginPage from "../components/pages/Login";
import RegisterPage from "../components/pages/Register";
import NotFound from "../components/pages/NotFound";
import Tests from "../components/pages/Tests";
import Question from "../components/pages/Preguntas_Frecuentes";
import AboutUs from "../components/pages/AboutUs";
import Footer from "../components/organisms/footer";
import VerifyEmail from "../components/pages/VerifyEmail";
import Loading from "../components/atoms/Loading";
import VisitInHome from '../components/organisms/VisitInHome';
import PasswordResetPage from "../components/pages/ResetPassword";
import AuthAppBar from "../components/organisms/AppBarLoggin";
import GuestAppBar from "../components/organisms/AppBarLoggout";
import SettingsPage from "../components/pages/settings/Settings";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../components/pages/UserProfile";
import PropertyEditor from "../components/pages/PropertyEditor";
import PropertyEditorWrapper from "../components/pages/PropertyEditorWrapper";
import PropertyDetail from "../components/pages/property";

const AppRoutesContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [emailConfirmed, setEmailConfirmed] = useState(null);
  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const confirmed = await isEmailConfirmed();
        setEmailConfirmed(confirmed);
      } else {
        setEmailConfirmed(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null || emailConfirmed === null) {
    // Muestra un loader mientras se verifica la autenticación y la confirmación del correo
    return <Loading message="Haciendo unas cositas" />;
  }

  // Ocultar Footer y AppBar en las rutas de login y registro
  const hideHeaderFooter = ["/auth/login", "/auth/register", "/auth/reset-password"].includes(location.pathname);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Asegura que el contenedor ocupe toda la altura de la ventana
      }}
    >
      {!hideHeaderFooter && (
        isLoggedIn 
          ? <AuthAppBar />
          : <GuestAppBar />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Contenido principal */}
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explorar" element={<VisitInHome />} />
          <Route path="/preguntas-frecuentes" element={<Question />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route path="/tests" element={<PrivateRoute element={<Tests />} />} />
          <Route
            path="/verify-email"
            element={
              emailConfirmed
                ? <Navigate to="/" /> // Redirige si el correo ya está confirmado
                : <PrivateRoute element={<VerifyEmail />} />
            }
          />
          <Route path="/auth/reset-password" element={<PasswordResetPage />} />
          <Route path="/configuracion/*" element={<PrivateRoute element={<SettingsPage />} />} />
          <Route path="/perfil/*" element={<PrivateRoute element={<UserProfile />} />} />
          <Route path="/perfil/:userId" element={<PrivateRoute element={<UserProfile />} />} />
          <Route path="/editar-propiedad" element={<PrivateRoute element={<PropertyEditor />} />} />
          <Route path="/propiedad/nueva" element={<PropertyEditor />} />
          <Route path="/propiedad/editar/:propertyId" element={<PrivateRoute element={<PropertyEditorWrapper />} />} />
          <Route path="/propiedad/:propertyId" element={<PropertyDetail />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => (
  <Router>
    <AppRoutesContent />
  </Router>
);

export default AppRoutes;
