import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: '#172730', // Cambiado a un color oscuro
        color: 'white', // El texto permanece blanco para contraste
        mt: 'auto', // Asegura que el footer se empuje hacia abajo
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              QuickTrips
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Conectamos viajeros con anfitriones locales para ofrecer experiencias auténticas en todo el mundo.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Enlaces
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <a href="/explorar" style={{ color: 'white', textDecoration: 'none' }}>Explorar</a>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <a href="/preguntas-frecuentes" style={{ color: 'white', textDecoration: 'none' }}>Preguntas frecuentes</a>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <a href="/sobre-nosotros" style={{ color: 'white', textDecoration: 'none' }}>Sobre nosotros</a>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <a href="mailto:contact@quicktrips.lat" style={{ color: 'white', textDecoration: 'none' }}>
                contact@quicktrips.lat
              </a>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <a href="tel:+524491234567" style={{ color: 'white', textDecoration: 'none' }}>
                +52 (449) 123-4567
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4 }}>
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} QuickTrips. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;