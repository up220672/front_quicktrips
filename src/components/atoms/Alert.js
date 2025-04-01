import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Alerta de éxito
export function SuccessAlert() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', my: 2 }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — check it out!
      </Alert>
    </Box>
  );
}

// Alerta de información
export function InfoAlert() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', my: 2 }}>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — check it out!
      </Alert>
    </Box>
  );
}

// Alerta de advertencia
export function WarningAlert() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', my: 2 }}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — check it out!
      </Alert>
    </Box>
  );
}

// Alerta de error
export function ErrorAlert() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', my: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — check it out!
      </Alert>
    </Box>
  );
}

// Alerta dinámica
export function DynamicAlert({ severity, title, message }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', maxWidth: isMobile ? '100%' : 500, mx: 'auto', my: 2 }}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}