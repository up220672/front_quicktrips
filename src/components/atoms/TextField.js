import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange, type = 'text' }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
    />
  );
};

export default CustomTextField;