import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Componente ComboBox con props dinámicas
export default function ComboBox({ label, options, onSelect }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, value) => {
        const index = options.indexOf(value);
        onSelect(index);
      }}
    />
  );
}