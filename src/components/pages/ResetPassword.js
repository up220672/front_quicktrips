import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  useTheme,
  styled,
  Fade,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Container
} from '@mui/material';
import { 
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  VerifiedUser as VerifiedIcon,
  Send as SendIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const PasswordResetPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(Array(8).fill(''));
  const [activeDigit, setActiveDigit] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  const inputRefs = useRef([]);

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

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSendCode = async () => {
    if (!email) {
      showSnackbar('Por favor ingresa tu correo electrónico', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('https://backend.quicktrips.lat/api/request-password-reset', {
        email: email
      });
      
      showSnackbar(response.data.message || 'Código enviado con éxito', 'success');
      setStep(2);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Error al enviar el código';
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (code.some(digit => digit === '')) {
      showSnackbar('Por favor ingresa el código completo', 'error');
      return;
    }
    
    if (!validatePassword()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('https://backend.quicktrips.lat/api/reset-password', {
        email: email,
        code: code.join(''),
        newPassword: newPassword
      });
      
      if (response.data.message === 'Password reset successful') {
        setSuccess(true);
        showSnackbar('¡Contraseña cambiada con éxito!', 'success');
        setTimeout(() => navigate('/auth/login'), 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         'Error al cambiar la contraseña';
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
      const response = await axios.post('https://backend.quicktrips.lat/api/resend-reset-code', {
        email: email
      });
      
      showSnackbar(response.data.message || 'Código reenviado con éxito', 'success');
      setCode(Array(8).fill(''));
      setActiveDigit(0);
      inputRefs.current[0].focus();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         'Error al reenviar el código';
      showSnackbar(errorMessage, 'error');
    } finally {
      setResendLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({...prev, open: false}));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Box sx={{
          display: 'inline-flex',
          p: 3,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          color: "white",
          boxShadow: 3,
          mb: 3
        }}>
          {success ? (
            <VerifiedIcon sx={{ fontSize: '3rem' }} />
          ) : (
            <LockIcon sx={{ fontSize: '3rem' }} />
          )}
        </Box>
        
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          mb: 1,
          color: theme.palette.primary.main
        }}>
          {success ? '¡Contraseña Cambiada!' : 'Restablecer Contraseña'}
        </Typography>
        
        {step === 1 && (
          <Fade in={step === 1} timeout={500}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Ingresa tu correo electrónico para recibir un código de verificación
              </Typography>
              
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                variant="contained"
                size="large"
                onClick={handleSendCode}
                disabled={loading || !email}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600
                }}
                fullWidth
              >
                {loading ? 'Enviando...' : 'Enviar Código'}
              </Button>
            </Box>
          </Fade>
        )}
        
        {step === 2 && !success && (
          <Fade in={step === 2 && !success} timeout={500}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Hemos enviado un código de 8 dígitos a {email}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
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
              
              <Box sx={{ position: 'absolute', left: '-9999px' }}>
                {code.map((_, index) => (
                  <TextField
                    key={index}
                    inputRef={el => inputRefs.current[index] = el}
                    value={code[index]}
                    onChange={(e) => handleCodeChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setActiveDigit(index)}
                    inputProps={{ maxLength: 1, inputMode: 'numeric' }}
                  />
                ))}
              </Box>

              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validatePassword}
                  error={!!passwordError}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Button
                variant="contained"
                size="large"
                onClick={handleResetPassword}
                disabled={loading || code.some(digit => digit === '')}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 600,
                  mb: 2
                }}
                fullWidth
              >
                {loading ? 'Procesando...' : 'Cambiar Contraseña'}
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
                fullWidth
              >
                {resendLoading ? 'Enviando...' : 'Reenviar Código'}
              </Button>
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default PasswordResetPage;