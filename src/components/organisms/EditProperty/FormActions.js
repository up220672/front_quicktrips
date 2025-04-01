import React from 'react';
import { Box, Button } from '@mui/material';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

const FormActions = ({ activeStep, stepsLength, onBack, onNext }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="outlined"
        onClick={onBack}
        startIcon={<ArrowBack />}
      >
        {activeStep === 0 ? 'Cancelar' : 'Atrás'}
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        endIcon={activeStep === stepsLength - 1 ? <CheckCircle /> : <ArrowForward />}
      >
        {activeStep === stepsLength - 1 ? 'Guardar propiedad' : 'Siguiente'}
      </Button>
    </Box>
  );
};

export default FormActions;