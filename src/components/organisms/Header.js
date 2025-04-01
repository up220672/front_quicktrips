import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: 'none',
        padding: '10px 0'
      }}
    >
      <Toolbar>
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
          <Button color="inherit" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Home
          </Button>
          <Button color="inherit" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Sobre Nosotros
          </Button>
          <Button color="inherit" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Hazte Socio
          </Button>
          <Button color="inherit" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Preguntas Frecuentes
          </Button>
        </Box>

        {/* Account Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Crear Cuenta
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;