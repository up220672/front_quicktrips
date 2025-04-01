import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import Header from '../components/Header';

const RegisterProperty = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container>
        {/* Title */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ marginTop: 4, color: '#00bcd4', fontWeight: 'bold' }}
        >
          Registra tu hogar
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: '#000', fontWeight: 'bold' }}
        >
          Detalles de la propiedad
        </Typography>

        {/* Buttons Grid */}
        <Grid container spacing={2} justifyContent="center">
          {[
            'Tipo de propiedad',
            'Reglas Locales',
            'Número de habitaciones',
            'Amenidades',
            'Disponibilidad Máxima',
            'Comprobante de domicilio',
            'Capacidad Máxima',
            'Nombre del Propietario',
            'Precio Pro Día/Mes',
            'Datos de Contacto'
          ].map((label, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Button
                variant="contained"
                fullWidth
                disabled
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#bdbdbd',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: '8px',
                  padding: '10px 0'
                }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Payment Method Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            variant="contained"
            disabled
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#bdbdbd',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              padding: '10px 20px'
            }}
          >
            Método de Pago
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterProperty;