import React, { useState, useEffect, useCallback } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import NotificationAlert from '../../atoms/NotificationAlert';

const BasicInfoStep = ({ property, setProperty }) => {
  const token = Cookies.get('token');
  const [timeoutId, setTimeoutId] = useState(null);
  const API_BASE_URL = 'http://localhost:3001';
  const draftId = localStorage.getItem('property_draft');

  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: 'info'
  });

  // Obtener los datos actuales del draft
  const draftData = property.draft?.draft_data || {
    title: '',
    type: '',
    markdown_description: '',
    max_guests: '',
    max_babies: '',
    check_in: 0,
    check_out: 0,
    min_stay_nights: '',
    max_stay_nights: '',
    width: 1,
    length: 1,
    price_per_night: '',
    currency: 'MXN'
  };

  const updateDraft = useCallback(async (updatedData) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/drafts/property/${draftId}`,
        { draft_data: updatedData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Draft actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar draft:', error);
    }
  }, [draftId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Validaciones
    if (name === 'min_stay_nights' && value < 1) {
      setNotification({
        isOpen: true,
        message: 'La estancia mínima debe ser al menos 1 noche.',
        type: 'warning'
      });
      return;
    }
    if (name === 'max_stay_nights' && value < 1) {
      setNotification({
        isOpen: true,
        message: 'La estancia máxima debe ser al menos 1 noche.',
        type: 'warning'
      });
      return;
    }
    if (name === 'price_per_night' && value < 0) {
      setNotification({
        isOpen: true,
        message: 'El precio por noche no puede ser negativo.',
        type: 'error'
      });
      return;
    }

    // Actualización optimista del estado
    const updatedData = {
      ...draftData,
      [name]: newValue
    };

    setProperty(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        draft_data: updatedData
      }
    }));

    // Debounce para la actualización de la API
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => updateDraft(updatedData), 1000);
    setTimeoutId(newTimeoutId);
  };

  const handleTimeChange = (name, newValue) => {
    if (newValue) {
      const timeInMinutes = newValue.hour() * 60 + newValue.minute();
      const updatedData = {
        ...draftData,
        [name]: timeInMinutes
      };

      setProperty(prev => ({
        ...prev,
        draft: {
          ...prev.draft,
          draft_data: updatedData
        }
      }));

      // Debounce para la actualización de la API
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => updateDraft(updatedData), 1000);
      setTimeoutId(newTimeoutId);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  return (
    <>
      <NotificationAlert
        isOpen={notification.isOpen}
        onConfirm={() => setNotification({ ...notification, isOpen: false })}
        title="Validación"
        message={notification.message}
        type={notification.type}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Título de la propiedad"
                name="title"
                value={draftData.title || ''}
                onChange={handleChange}
                required
                error={!draftData.title}
                helperText={!draftData.title && "El título es obligatorio"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de propiedad</InputLabel>
                <Select
                  name="type"
                  value={draftData.type || ''}
                  onChange={handleChange}
                  label="Tipo de propiedad"
                  required
                >
                  <MenuItem value={0}>Casa completa</MenuItem>
                  <MenuItem value={1}>Departamento</MenuItem>
                  <MenuItem value={2}>Cabaña</MenuItem>
                  <MenuItem value={3}>Habitación privada</MenuItem>
                  <MenuItem value={4}>Casa de campo</MenuItem>
                  <MenuItem value={5}>Villa</MenuItem>
                  <MenuItem value={6}>Loft</MenuItem>
                  <MenuItem value={7}>Estudio</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="markdown_description"
                value={draftData.markdown_description || ''}
                onChange={handleChange}
                multiline
                rows={4}
                required
                error={!draftData.markdown_description}
                helperText={!draftData.markdown_description && "La descripción es obligatoria"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Huéspedes máximos"
                name="max_guests"
                type="number"
                value={draftData.max_guests || ''}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
                error={!draftData.max_guests || draftData.max_guests < 1}
                helperText={
                  (!draftData.max_guests || draftData.max_guests < 1) &&
                  "El número de huéspedes máximos es obligatorio y debe ser al menos 1."
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bebés máximos"
                name="max_babies"
                type="number"
                value={draftData.max_babies || ''}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TimePicker
                label="Hora de entrada"
                value={dayjs().startOf('day').add(draftData.check_in || 0, 'minute')}
                onChange={(newValue) => handleTimeChange('check_in', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TimePicker
                label="Hora de salida"
                value={dayjs().startOf('day').add(draftData.check_out || 0, 'minute')}
                onChange={(newValue) => handleTimeChange('check_out', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Estancia mínima (noches)"
                name="min_stay_nights"
                type="number"
                value={draftData.min_stay_nights || ''}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
                error={!draftData.min_stay_nights || draftData.min_stay_nights < 1}
                helperText={
                  (!draftData.min_stay_nights || draftData.min_stay_nights < 1) &&
                  "La estancia mínima es obligatoria y debe ser al menos 1 noche."
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Estancia máxima (noches)"
                name="max_stay_nights"
                type="number"
                value={draftData.max_stay_nights || ''}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
                error={!draftData.max_stay_nights || draftData.max_stay_nights < 1}
                helperText={
                  (!draftData.max_stay_nights || draftData.max_stay_nights < 1) &&
                  "La estancia máxima es obligatoria y debe ser al menos 1 noche."
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ancho (metros)"
                name="width"
                type="number"
                value={draftData.width || 1}
                onChange={handleChange}
                inputProps={{ min: 1, step: "0.01" }}
                required
                error={draftData.width < 1}
                helperText={draftData.width < 1 && "Mínimo 1 metro"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Largo (metros)"
                name="length"
                type="number"
                value={draftData.length || 1}
                onChange={handleChange}
                inputProps={{ min: 1, step: "0.01" }}
                required
                error={draftData.length < 1}
                helperText={draftData.length < 1 && "Mínimo 1 metro"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio por noche"
                name="price_per_night"
                type="number"
                value={draftData.price_per_night || ''}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  inputProps: { min: 0, step: "0.01" }
                }}
                required
                error={!draftData.price_per_night || draftData.price_per_night < 0}
                helperText={
                  (!draftData.price_per_night || draftData.price_per_night < 0) &&
                  "El precio por noche es obligatorio y debe ser mayor a 0."
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select
                  name="currency"
                  value={draftData.currency || 'MXN'}
                  onChange={handleChange}
                  label="Moneda"
                  required
                >
                  <MenuItem value="MXN">MXN (Pesos mexicanos)</MenuItem>
                  <MenuItem value="USD">USD (Dólares americanos)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </motion.div>
    </>
  );
};

export default BasicInfoStep;