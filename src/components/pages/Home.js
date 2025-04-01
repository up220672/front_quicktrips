import React, { useEffect, useState } from 'react';
import VisitInHome from '../organisms/VisitInHome';
import LoggedInHomePage from '../organisms/LoggedInHome';
import DynamicNotification from '../atoms/NotificationAlert';
import Loading from '../atoms/Loading';
import EmailIcon from '@mui/icons-material/Email';
import { isAuthenticated, isEmailConfirmed } from '../../utils/auth';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [emailConfirmed, setEmailConfirmed] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkAuthAndEmail = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const confirmed = await isEmailConfirmed();
        setEmailConfirmed(confirmed);
        // Mostrar notificación solo si está autenticado pero no ha confirmado email
        setShowNotification(!confirmed);
      } else {
        setEmailConfirmed(false);
      }
    };

    checkAuthAndEmail();
  }, []);

  if (isLoggedIn === null || emailConfirmed === null) {
    return <Loading message="Haciendo unas cositas..." />; // Usa el nuevo componente
  }

  return (
    <>
      {isLoggedIn ? <LoggedInHomePage /> : <VisitInHome />}
      
      {showNotification && (
        <DynamicNotification
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
          onConfirm={() => {
            // Acción de confirmación
            window.location.href = '/verify-email';
          }}
          title="Verificación requerida"
          message="Para acceder a todas las funciones de la plataforma, por favor verifica tu dirección de correo electrónico."
          closeText="Más tarde"
          confirmText="Verificar ahora"
          icon={<EmailIcon color="primary" />}
        />
      )}
    </>
  );
};

export default Home;