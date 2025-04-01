import React, { useState, useEffect, useCallback } from 'react';
import { Grid, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import LeafletMap from '../../../utils/MapComponent';
import axios from 'axios';
import Cookies from 'js-cookie';

const LocationStep = ({ property, setProperty }) => {
  const token = Cookies.get('token');
  const [timeoutId, setTimeoutId] = useState(null);
  const API_BASE_URL = 'https://backend.quicktrips.lat';
  const draftId = localStorage.getItem('property_draft');

  // Obtener los datos de ubicación actuales
  const addressData = property.draft?.draft_data?.address || {
    street: '',
    exterior_number: '',
    interior_number: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'México',
    latitude: null,
    longitude: null,
    references: ''
  };

  const updateDraft = useCallback(async (updatedAddress) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/drafts/property/${draftId}`,
        { 
          draft_data: {
            ...property.draft.draft_data,
            address: updatedAddress
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Ubicación actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar ubicación:', error);
    }
  }, [draftId, token, property.draft?.draft_data]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    
    // Actualización optimista del estado
    const updatedAddress = {
      ...addressData,
      [name]: value
    };

    setProperty(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        draft_data: {
          ...prev.draft.draft_data,
          address: updatedAddress
        }
      }
    }));

    // Debounce para la actualización de la API
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => updateDraft(updatedAddress), 1000);
    setTimeoutId(newTimeoutId);
  };

  const handleMapPositionChange = (position) => {
    const updatedAddress = {
      ...addressData,
      latitude: position.lat,
      longitude: position.lng
    };

    // Actualización inmediata para la posición del mapa
    setProperty(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        draft_data: {
          ...prev.draft.draft_data,
          address: updatedAddress
        }
      }
    }));

    updateDraft(updatedAddress);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Calle"
            name="street"
            value={addressData.street || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Número exterior"
            name="exterior_number"
            value={addressData.exterior_number || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Número interior"
            name="interior_number"
            value={addressData.interior_number || ''}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Colonia"
            name="neighborhood"
            value={addressData.neighborhood || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Ciudad"
            name="city"
            value={addressData.city || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Estado"
            name="state"
            value={addressData.state || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Código postal"
            name="postal_code"
            value={addressData.postal_code || ''}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="País"
            name="country"
            value={addressData.country || 'México'}
            onChange={handleAddressChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Referencias"
            name="references"
            value={addressData.references || ''}
            onChange={handleAddressChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Selecciona la ubicación en el mapa
          </Typography>
          <Box sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }}>
            <LeafletMap
              position={
                addressData.latitude && addressData.longitude
                  ? { lat: addressData.latitude, lng: addressData.longitude }
                  : null
              }
              setPosition={handleMapPositionChange}
            />
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default LocationStep;