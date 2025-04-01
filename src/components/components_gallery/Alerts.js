import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { SuccessAlert, InfoAlert, WarningAlert, ErrorAlert, DynamicAlert } from '../atoms/Alert';

export const AlertsGallery = () => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Alerts</h1>

    <div style={styles.stack}>
      <SuccessAlert />
      <InfoAlert />
      <WarningAlert />
      <ErrorAlert />
    </div>

    <div style={styles.stack}>
      <DynamicAlert
        severity="error" // Cambia esto
        title="Dynamic Alert"
        message="This is a dynamically customized alert!"
      />
    </div>
  </div>
);

const styles = {
  container: {
    gap: '1rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  stack: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
};

export default function App() {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <AlertsGallery />
      </StyledEngineProvider>
    </React.StrictMode>
  );
}