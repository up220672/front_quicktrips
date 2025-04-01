import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const Panel = ({ children, backgroundColor, textColor }) => {
  const theme = useTheme(); // Obtener el tema actual

  return (
    <Paper elevation={3} sx={{ backgroundColor: backgroundColor || theme.palette.primary.main, display: 'inline-block', width: 'auto', fontFamily: theme.typography.fontFamily }}>
      <Box p={2} sx={{ color: textColor || theme.palette.primary.contrastText }}>
        {children}
      </Box>
    </Paper>
  );
};

export default Panel;