import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Divider, Grid, Box, Stack, Switch, FormControlLabel, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { KingBed, Bathtub, Kitchen, Check } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';

// Mapeo de traducción para amenities
const amenityTranslations = {
  essentials: 'Artículos esenciales',
  shampoo: 'Shampoo',
  hair_dryer: 'Secador de pelo',
  hot_water: 'Agua caliente',
  bed_linens: 'Ropa de cama',
  extra_pillows: 'Almohadas extra',
  wardrobe: 'Armario',
  blackout_curtains: 'Cortinas blackout',
  refrigerator: 'Refrigerador',
  microwave: 'Microondas',
  cooking_basics: 'Utensilios básicos',
  dishes_utensils: 'Vajilla y cubiertos',
  stove: 'Estufa',
  oven: 'Horno',
  coffee_maker: 'Cafetera'
};

const RoomsStep = ({ property, setProperty }) => {
  const token = Cookies.get('token');
  const [timeoutId, setTimeoutId] = useState(null);
  const API_BASE_URL = 'http://localhost:3001';
  const draftId = localStorage.getItem('property_draft');

  // Obtener datos actuales de property
  const roomsData = property.draft?.draft_data || {
    bedrooms_count: 0,
    bathrooms_count: 0,
    has_kitchen: false,
    total_beds: 0,
    bathroom_amenities: {
      essentials: false,
      shampoo: false,
      hair_dryer: false,
      hot_water: false
    },
    bedroom_amenities: {
      bed_linens: false,
      extra_pillows: false,
      wardrobe: false,
      blackout_curtains: false
    },
    kitchen_amenities: {
      refrigerator: false,
      microwave: false,
      cooking_basics: false,
      dishes_utensils: false,
      stove: false,
      oven: false,
      coffee_maker: false
    }
  };

  const updateDraft = useCallback(async (updatedData) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/drafts/property/${draftId}`,
        { draft_data: updatedData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al actualizar draft:', error);
    }
  }, [draftId, token]);

  const debouncedUpdate = useCallback((updatedData) => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => updateDraft(updatedData), 1000);
    setTimeoutId(newTimeoutId);
  }, [timeoutId, updateDraft]);

  const handleChange = (path, value) => {
    // Función para actualizar objetos anidados
    const updateNestedState = (prev) => {
      const newState = { ...prev.draft.draft_data };
      const parts = path.split('.');
      let current = newState;
      
      for (let i = 0; i < parts.length - 1; i++) {
        current[parts[i]] = { ...current[parts[i]] };
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = value;
      
      return {
        ...prev,
        draft: {
          ...prev.draft,
          draft_data: newState
        }
      };
    };

    setProperty(prev => {
      const updatedProperty = updateNestedState(prev);
      debouncedUpdate(updatedProperty.draft.draft_data);
      return updatedProperty;
    });
  };

  const AmenityItem = ({ nameKey, present, path }) => (
    <FormControlLabel
      control={
        <Switch
          checked={present}
          onChange={(e) => handleChange(path, e.target.checked)}
          color="primary"
        />
      }
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <Check fontSize="small" color={present ? "primary" : "disabled"} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {amenityTranslations[nameKey]}
          </Typography>
        </Box>
      }
      sx={{ width: '100%', justifyContent: 'space-between', m: 0 }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Sección Dormitorios */}
            <Grid item xs={12} md={4}>
              <Box p={3} borderRadius={4} bgcolor="background.paper" boxShadow={2}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <KingBed color="primary" />
                  <TextField
                    label="Habitaciones"
                    type="number"
                    value={roomsData.bedrooms_count || 0}
                    onChange={(e) => handleChange('bedrooms_count', parseInt(e.target.value || 0))}
                    inputProps={{ min: 0 }}
                  />
                  <TextField
                    label="Camas totales"
                    type="number"
                    value={roomsData.total_beds || 0}
                    onChange={(e) => handleChange('total_beds', parseInt(e.target.value || 0))}
                    inputProps={{ min: 0 }}
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                {Object.entries(roomsData.bedroom_amenities || {}).map(([key, value]) => (
                  <AmenityItem
                    key={key}
                    nameKey={key}
                    present={value}
                    path={`bedroom_amenities.${key}`}
                  />
                ))}
              </Box>
            </Grid>

            {/* Sección Baños */}
            <Grid item xs={12} md={4}>
              <Box p={3} borderRadius={4} bgcolor="background.paper" boxShadow={2}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Bathtub color="primary" />
                  <TextField
                    label="Baños"
                    type="number"
                    value={roomsData.bathrooms_count || 0}
                    onChange={(e) => handleChange('bathrooms_count', parseInt(e.target.value || 0))}
                    inputProps={{ min: 0 }}
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                {Object.entries(roomsData.bathroom_amenities || {}).map(([key, value]) => (
                  <AmenityItem
                    key={key}
                    nameKey={key}
                    present={value}
                    path={`bathroom_amenities.${key}`}
                  />
                ))}
              </Box>
            </Grid>

            {/* Sección Cocina */}
            <Grid item xs={12} md={4}>
              <Box p={3} borderRadius={4} bgcolor="background.paper" boxShadow={2}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Kitchen color="primary" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={roomsData.has_kitchen || false}
                        onChange={(e) => handleChange('has_kitchen', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="¿Incluye cocina?"
                  />
                </Stack>
                {roomsData.has_kitchen && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    {Object.entries(roomsData.kitchen_amenities || {}).map(([key, value]) => (
                      <AmenityItem
                        key={key}
                        nameKey={key}
                        present={value}
                        path={`kitchen_amenities.${key}`}
                      />
                    ))}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default RoomsStep;