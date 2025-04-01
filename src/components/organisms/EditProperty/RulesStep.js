import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Box, TextField, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';

const RulesStep = ({ property, setProperty }) => {
  const [newRule, setNewRule] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const token = Cookies.get('token');
  const API_BASE_URL = 'http://localhost:3001';
  const draftId = localStorage.getItem('property_draft');

  // Obtener reglas directamente del draft_data o inicializar array vacío
  const rules = property?.draft?.draft_data?.rules || [];

  const updateDraft = useCallback(async (updatedRules) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/drafts/property/${draftId}`,
        { 
          draft_data: { 
            ...property.draft.draft_data, 
            rules: updatedRules 
          } 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Reglas actualizadas exitosamente');
    } catch (error) {
      console.error('Error al actualizar reglas:', error);
    }
  }, [draftId, token, property.draft?.draft_data]);

  const handleAddRule = () => {
    if (newRule.trim()) {
      const updatedRules = [...rules, newRule.trim()];
      
      // Actualización optimista del estado
      setProperty(prev => ({
        ...prev,
        draft: {
          ...prev.draft,
          draft_data: {
            ...prev.draft.draft_data,
            rules: updatedRules
          }
        }
      }));
      
      setNewRule('');
      
      // Debounce para la actualización de la API
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => updateDraft(updatedRules), 1000);
      setTimeoutId(newTimeoutId);
    }
  };

  const handleRemoveRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    
    // Actualización optimista del estado
    setProperty(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        draft_data: {
          ...prev.draft.draft_data,
          rules: updatedRules
        }
      }
    }));
    
    // Debounce para la actualización de la API
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => updateDraft(updatedRules), 1000);
    setTimeoutId(newTimeoutId);
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
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Reglas de la propiedad
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              fullWidth
              label="Añadir regla"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddRule()}
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handleAddRule}
              disabled={!newRule.trim()}
            >
              Añadir
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {rules.map((rule, index) => (
              <Chip
                key={index}
                label={rule}
                onDelete={() => handleRemoveRule(index)}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default RulesStep;