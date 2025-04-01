import React from 'react';
import { Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const AppearanceSection = () => (
  <>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
        🎨
      </motion.div>
      Apariencia
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Personaliza el tema y estilo de la aplicación
    </Typography>
    <Divider sx={{ mb: 4 }} />
    <Typography>Configuración de tema aquí...</Typography>
  </>
);

export default AppearanceSection;