import React, { useEffect, useState, useCallback } from 'react';
import { Grid, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  Wifi, 
  AcUnit, 
  LocalParking, 
  Pool, 
  Pets, 
  SmokeFree, 
  Event, 
  ChildCare, 
  Accessibility, 
  Balcony, 
  Spa, 
  SportsSoccer, 
  DirectionsCar, 
  Fireplace, 
  FitnessCenter, 
  LocalLaundryService, 
  Iron, 
  Bathtub, 
  BeachAccess, 
  EvStation, 
  Security, 
  OutdoorGrill, 
  Yard, 
  Elevator, 
  SportsTennis, 
  SportsBasketball, 
  SportsVolleyball, 
  GolfCourse, 
  Toys, 
  LibraryBooks, 
  Movie, 
  MusicNote, 
  Work, 
  SportsEsports, 
  LocalFireDepartment, 
  LocalLaundryService as LaundryRoomIcon, 
  Deck 
} from '@mui/icons-material';


// Define un array con la configuración de las amenidades
const AMENITIES_CONFIG = [
  { name: 'wifi', label: 'WiFi', icon: <Wifi sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'panoramic_view', label: 'Vista panorámica', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'bay_view', label: 'Vista a la bahía', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'city_view', label: 'Vista a la ciudad', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'mountain_view', label: 'Vista a la montaña', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'lake_view', label: 'Vista al lago', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'garden_view', label: 'Vista al jardín', icon: <Yard sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'pool_view', label: 'Vista a la alberca', icon: <Pool sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'beach_view', label: 'Vista a la playa', icon: <BeachAccess sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'forest_view', label: 'Vista al bosque', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'ocean_view', label: 'Vista al océano', icon: <BeachAccess sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'cleaning_service', label: 'Servicio de limpieza', icon: <LocalLaundryService sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'laundry_service', label: 'Servicio de lavandería', icon: <LocalLaundryService sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'laundry_room', label: 'Cuarto de lavandería', icon: <LaundryRoomIcon sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'iron', label: 'Plancha', icon: <Iron sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'ironing_board', label: 'Tabla de planchar', icon: <Iron sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'washing_machine', label: 'Lavadora', icon: <LocalLaundryService sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'dryer', label: 'Secadora', icon: <LocalLaundryService sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'safe_box', label: 'Caja fuerte', icon: <Security sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'security_system', label: 'Sistema de seguridad', icon: <Security sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'fire_extinguisher', label: 'Extintor', icon: <LocalFireDepartment sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'outdoor_furniture', label: 'Muebles de exterior', icon: <Deck sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'bbq_grill', label: 'Parrilla BBQ', icon: <OutdoorGrill sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'private_pool', label: 'Alberca privada', icon: <Pool sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'shared_pool', label: 'Alberca compartida', icon: <Pool sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'private_gym', label: 'Gimnasio privado', icon: <FitnessCenter sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'shared_gym', label: 'Gimnasio compartido', icon: <FitnessCenter sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'sauna', label: 'Sauna', icon: <Spa sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'jacuzzi', label: 'Jacuzzi', icon: <Bathtub sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'sun_loungers', label: 'Camastros', icon: <Deck sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'hammock', label: 'Hamaca', icon: <Deck sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'fire_pit', label: 'Fogata', icon: <Fireplace sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'gazebo', label: 'Gazebo', icon: <Deck sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'elevator', label: 'Elevador', icon: <Elevator sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'private_parking', label: 'Estacionamiento privado', icon: <DirectionsCar sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'street_parking', label: 'Estacionamiento en la calle', icon: <DirectionsCar sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'garage', label: 'Garaje', icon: <DirectionsCar sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'bike_storage', label: 'Almacenamiento de bicicletas', icon: <DirectionsCar sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'private_entrance', label: 'Entrada privada', icon: <DirectionsCar sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'first_aid_kit', label: 'Botiquín de primeros auxilios', icon: <LocalFireDepartment sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'smoke_detector', label: 'Detector de humo', icon: <LocalFireDepartment sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'carbon_monoxide_detector', label: 'Detector de monóxido de carbono', icon: <LocalFireDepartment sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'balcony', label: 'Balcón', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'terrace', label: 'Terraza', icon: <Balcony sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'garden', label: 'Jardín', icon: <Yard sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'spa', label: 'Spa', icon: <Spa sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'library_room', label: 'Biblioteca', icon: <LibraryBooks sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'cinema_room', label: 'Sala de cine', icon: <Movie sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'game_room', label: 'Sala de juegos', icon: <SportsEsports sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'music_room', label: 'Sala de música', icon: <MusicNote sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'office', label: 'Oficina', icon: <Work sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'ping_pong_table', label: 'Mesa de ping pong', icon: <SportsEsports sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'pool_table', label: 'Mesa de billar', icon: <SportsEsports sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'children_play_area', label: 'Área de juegos para niños', icon: <Toys sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'tennis_court', label: 'Cancha de tenis', icon: <SportsTennis sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'basketball_court', label: 'Cancha de baloncesto', icon: <SportsBasketball sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'soccer_field', label: 'Cancha de fútbol', icon: <SportsSoccer sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'volleyball_court', label: 'Cancha de voleibol', icon: <SportsVolleyball sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'golf_course', label: 'Campo de golf', icon: <GolfCourse sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'mini_golf', label: 'Mini golf', icon: <GolfCourse sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'beach_access', label: 'Acceso a la playa', icon: <BeachAccess sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'lake_access', label: 'Acceso al lago', icon: <BeachAccess sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'river_access', label: 'Acceso al río', icon: <BeachAccess sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'printer', label: 'Impresora', icon: <Work sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'scanner', label: 'Escáner', icon: <Work sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'pet_friendly', label: 'Apto para mascotas', icon: <Pets sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'kid_friendly', label: 'Apto para niños', icon: <ChildCare sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'elderly_friendly', label: 'Apto para personas mayores', icon: <Accessibility sx={{ mr: 1, color: 'secondary.main' }} /> },
  { name: 'electric_vehicle_charging_station', label: 'Cargador para vehículos eléctricos', icon: <EvStation sx={{ mr: 1, color: 'secondary.main' }} /> },
];

const AmenitiesStep = ({ property, setProperty }) => {
  const token = Cookies.get('token');
  const [timeoutId, setTimeoutId] = useState(null);
  const API_BASE_URL = 'http://localhost:3001';
  const draftId = localStorage.getItem('property_draft');

  // Obtener amenities actuales o inicializar objeto vacío
  const amenitiesData = property.draft?.draft_data?.amenities || {};

  const updateDraft = useCallback(async (updatedData) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/drafts/property/${draftId}`,
        { 
          draft_data: {
            ...property.draft.draft_data,
            amenities: updatedData
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al actualizar draft:', error);
    }
  }, [draftId, token, property.draft?.draft_data]);

  const debouncedUpdate = useCallback((updatedData) => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => updateDraft(updatedData), 1000);
    setTimeoutId(newTimeoutId);
  }, [timeoutId, updateDraft]);

  const handleAmenityChange = (name, checked) => {
    const updatedAmenities = {
      ...amenitiesData,
      [name]: checked
    };

    // Actualización optimista del estado
    setProperty(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        draft_data: {
          ...prev.draft.draft_data,
          amenities: updatedAmenities
        }
      }
    }));

    // Actualización debounceada a la API
    debouncedUpdate(updatedAmenities);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Selecciona las amenidades de tu propiedad
      </Typography>
      
      <Grid container spacing={3}>
        {AMENITIES_CONFIG.map((amenity, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!amenitiesData[amenity.name]}
                    onChange={(e) => handleAmenityChange(amenity.name, e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    {amenity.icon}
                    <Typography variant="body2">{amenity.label}</Typography>
                  </Box>
                }
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  p: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default AmenitiesStep;