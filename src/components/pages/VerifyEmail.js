import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  useTheme,
  styled,
  Slide,
  Fade,
  Zoom,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Email as EmailIcon,
  VerifiedUser as VerifiedIcon,
  Send as SendIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserParam } from '../../utils/auth';

const VerificationContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  textAlign: 'center'
});

const DigitBox = styled(Box)(({ theme, active, filled }) => ({
  width: '60px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  borderRadius: '12px',
  margin: '0 8px',
  backgroundColor: active ? theme.palette.primary.light : 
                filled ? theme.palette.background.paper : theme.palette.background.default,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
}));

const EmailVerification = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const [code, setCode] = useState(Array(8).fill(''));
  const [activeDigit, setActiveDigit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  const inputRefs = useRef([]);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const userEmail = await getUserParam("email"); // Espera a que se resuelva la promesa
        if (userEmail) {
          setEmail(userEmail);
        } else {
          showSnackbar('No se pudo obtener el email del usuario', 'error');
          setTimeout(() => navigate('/auth/login'), 3000);
        }
      } catch (error) {
        console.error("Error al obtener el email del usuario:", error);
        showSnackbar('Error al obtener el email del usuario', 'error');
        setTimeout(() => navigate('/auth/login'), 3000);
      }
    };

    fetchEmail(); // Llama a la función asíncrona
  }, [navigate]);

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (code[index] && index >= 0) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 7) {
      inputRefs.current[index + 1].focus();
    } else if (e.key === 'Enter' && code.every(digit => digit !== '')) {
      // Solo permite enviar con Enter si todos los campos están llenos
      handleSubmit();
    }
  };

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    
    if (value && !/^\d$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 7) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    if (code.some(digit => digit === '')) {
      showSnackbar('Por favor ingresa el código completo', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('https://backend.quicktrips.lat/api/verify-email', {
        email: email,
        code: code.join('')
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.message === 'Email verification successful') {
        setSuccess(true);
        showSnackbar('¡Correo verificado con éxito!', 'success');
        setTimeout(() => navigate('/'), 2000);
      } else {
        showSnackbar(response.data.message || 'Error desconocido', 'error');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Error al verificar el código';
      showSnackbar(errorMessage, 'error');
      
      if (err.response?.status === 400) {
        setCode(Array(8).fill(''));
        setActiveDigit(0);
        inputRefs.current[0].focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    
    try {
      const response = await axios.post('https://backend.quicktrips.lat/api/resend-verification-code', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      showSnackbar(response.data.message || 'Código reenviado con éxito', 'success');
      setCode(Array(8).fill(''));
      setActiveDigit(0);
      inputRefs.current[0].focus();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Error al reenviar el código';
      showSnackbar(errorMessage, 'error');
    } finally {
      setResendLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({...prev, open: false}));
  };

  return (
    <VerificationContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Slide in={!!email} direction="down" timeout={500}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{
            display: 'inline-flex',
            p: 3,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.light,
            color: "#FFFFFF",
            boxShadow: 3,
            mb: 3
          }}>
            {success ? (
              <Zoom in={success}>
                <VerifiedIcon sx={{ fontSize: '3rem' }} />
              </Zoom>
            ) : (
              <EmailIcon sx={{ fontSize: '3rem' }} />
            )}
          </Box>
          
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            mb: 1,
            color: theme.palette.primary.main
          }}>
            {success ? '¡Verificación Exitosa!' : 'Verifica tu Email'}
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: '500px',
            mb: 4
          }}>
            {success 
              ? 'Redirigiendo...' 
              : `Hemos enviado un código de verificación de 8 dígitos a ${email || 'tu correo'}. Por favor ingrésalo a continuación.`}
          </Typography>
        </Box>
      </Slide>

      {!success && email && (
        <Fade in={!success && !!email} timeout={800}>
          <Box sx={{ width: '100%', maxWidth: '600px' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 4
            }}>
              {code.map((digit, index) => (
                <React.Fragment key={index}>
                  <DigitBox 
                    active={activeDigit === index}
                    filled={digit !== ''}
                    onClick={() => {
                      setActiveDigit(index);
                      inputRefs.current[index].focus();
                    }}
                  >
                    {digit}
                  </DigitBox>
                  {(index === 3) && (
                    <Box sx={{ 
                      width: '10px', 
                      alignSelf: 'center',
                      height: '2px',
                      backgroundColor: theme.palette.divider,
                      mx: 1
                    }} />
                  )}
                </React.Fragment>
              ))}
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              left: '-9999px'
            }}>
              {code.map((_, index) => (
                <TextField
                  key={index}
                  inputRef={el => inputRefs.current[index] = el}
                  id={`digit-${index}`}
                  value={code[index]}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setActiveDigit(index)}
                  inputProps={{ 
                    maxLength: 1,
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  autoFocus={index === 0}
                />
              ))}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              mb: 4
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading || code.some(digit => digit === '')}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600,
                  color: "#FFFFFF"
                }}
              >
                {loading ? 'Verificando...' : 'Verificar Código'}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={handleResendCode}
                disabled={resendLoading}
                startIcon={resendLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600,
                }}
              >
                {resendLoading ? 'Enviando...' : 'Reenviar Código'}
              </Button>
            </Box>
          </Box>
        </Fade>
      )}
    </VerificationContainer>
  );
};

export default EmailVerification;