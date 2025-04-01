import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo claro con opacidad
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: 'primary.main', // Usa el color primario del tema
          mb: 2, // Margen inferior
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: 'text.primary', // Usa el color de texto del tema
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;