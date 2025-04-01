import React from 'react';
import { Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const SecuritySection = () => (
  <>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
        🔒
      </motion.div>
      Seguridad
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Gestiona la seguridad de tu cuenta
    </Typography>
    <Divider sx={{ mb: 4 }} />
    <Typography>Configuración de seguridad aquí...</Typography>
  </>
);

export default SecuritySection;