import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Box, 
  Typography, 
  Divider,
  useMediaQuery,
  Avatar,
  Button,
  TextField,
  Grid,
  Chip,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from 'axios';
import { fetchUserInfo, getUserParam, getUserIdFromToken } from '../../../utils/auth';
import Cookies from "js-cookie";
import { ExpandMore, ExpandLess, LocationOn } from '@mui/icons-material';

// Lazy-load del componente LeafletMap
const LeafletMap = lazy(() => import('../../../utils/MapComponent'));

const API_BASE_URL = "https://backend.quicktrips.lat/api";

const ProfileSection = ({ onUserUpdate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [expandedAddress, setExpandedAddress] = useState(false);

  // Estado inicial centrado en Aguascalientes
  const [mapLocation, setMapLocation] = useState({
    lat: 21.88234, // Latitud de Aguascalientes
    lng: -102.28259, // Longitud de Aguascalientes
  });

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    description_markdown: '',
    phone: '',
    date_of_birth: '',
    language: '',
    address: {
      street: '',
      exterior_number: '',
      interior_number: '',
      neighborhood: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      references: '',
      latitude: null,
      longitude: null,
    },
    currency: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Supported languages and currencies
  const languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'MXN', label: 'MXN ($)' },
    { value: 'BRL', label: 'BRL (R$)' },
  ];

  // Función para obtener la URL completa de la imagen
  const getFullImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `https://backend.quicktrips.lat${path}`;
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserInfo();
        if (userData) {
          setFormData({
            username: userData.username || '',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            description_markdown: userData.description_markdown || '',
            phone: userData.phone || '',
            date_of_birth: userData.date_of_birth 
              ? new Date(userData.date_of_birth).toISOString().split('T')[0] // Convertir a "yyyy-MM-dd"
              : '',
            language: userData.language || '',
            address: userData.address || {
              street: '',
              exterior_number: '',
              interior_number: '',
              neighborhood: '',
              city: '',
              state: '',
              postal_code: '',
              country: '',
              references: '',
              latitude: null,
              longitude: null,
            },
            currency: userData.currency || '',
          });
          
          // Actualizado para manejar correctamente la URL de la imagen
          setPreviewImage(getFullImageUrl(userData.profile_picture));
          
          if (userData.address?.latitude && userData.address?.longitude) {
            setMapLocation({
              lat: userData.address.latitude,
              lng: userData.address.longitude,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setSnackbar({
          open: true,
          message: 'Error al cargar los datos del usuario',
          severity: 'error',
        });
      }
    };

    loadUserData();
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMapClick = (latlng) => {
    setMapLocation(latlng);
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        latitude: latlng.lat,
        longitude: latlng.lng,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let profilePictureUrl = formData.profile_picture; // Usamos el valor actual
      const user_id = await getUserIdFromToken();
    
      // Handle image upload if a new file was selected
      if (file) {
        // Obtén la URL de la imagen de forma asíncrona antes de actualizar el estado
        const newProfilePicture = await getUserParam("profile_picture");
      
        console.log("Se borrará: " + newProfilePicture);
      
        // Solo borramos la imagen anterior si existe
        if (newProfilePicture) {
          const fileName = newProfilePicture.split('/').pop();
          console.log("Imagen a borrar: " + fileName);
          await axios.delete(`${API_BASE_URL}/files/delete/photo/${fileName}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const uploadResponse = await axios.post(
          `${API_BASE_URL}/files/upload/photo`,
          uploadFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );

        if (uploadResponse.data.success) {
          profilePictureUrl = uploadResponse.data.url; // Esto ya viene como "/images/filename.ext"
        }
      }


      // Prepare update data
      const updateData = {
        ...formData,
        ...(profilePictureUrl && { profile_picture: profilePictureUrl }),
      };

      // Remove empty fields to avoid sending nulls
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === '' || updateData[key] === null) {
          delete updateData[key];
        }
      });

      // Clean address object
      Object.keys(updateData.address).forEach((key) => {
        if (updateData.address[key] === '' || updateData.address[key] === null) {
          delete updateData.address[key];
        }
      });

      // Send update request
      const response = await axios.put(`${API_BASE_URL}/user/${user_id}`, updateData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      // Update user data
      const updatedUser = await fetchUserInfo();
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      setSnackbar({
        open: true,
        message: 'Perfil actualizado con éxito',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error al actualizar el perfil',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
          👤
        </motion.div>
        Configuración de Perfil
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Personaliza cómo aparece tu información
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Box sx={{ 
              position: isMobile ? 'relative' : 'sticky',
              top: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Avatar
                src={previewImage || '/default-avatar.png'}
                sx={{ 
                  width: 120, 
                  height: 120,
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: theme.shadows[4]
                }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-upload"
                type="file"
                onChange={handleImageChange}
                disabled={isLoading}
              />
              <label htmlFor="profile-picture-upload">
                <Button 
                  variant="outlined" 
                  component="span" 
                  size="small"
                  disabled={isLoading}
                >
                  Cambiar foto
                </Button>
              </label>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                label="Apodo"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                required
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Nombre"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 2 } }}
                />
                <TextField
                  label="Apellido"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 2 } }}
                />
              </Box>

              <TextField
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />

              <Box sx={{ width: '100%' }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                  onClick={() => setExpandedAddress(!expandedAddress)}
                >
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1 }} /> Dirección
                  </Typography>
                  <IconButton size="small">
                    {expandedAddress ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedAddress}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        label="Calle"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        label="Número exterior"
                        name="address.exterior_number"
                        value={formData.address.exterior_number}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        label="Número interior"
                        name="address.interior_number"
                        value={formData.address.interior_number}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        label="Colonia"
                        name="address.neighborhood"
                        value={formData.address.neighborhood}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        label="Ciudad"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        label="Estado"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                      <TextField
                        label="Código Postal"
                        name="address.postal_code"
                        value={formData.address.postal_code}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ sx: { borderRadius: 2 } }}
                      />
                    </Box>

                    <TextField
                      label="País"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />

                    <TextField
                      label="Referencias"
                      name="address.references"
                      value={formData.address.references}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />

                    <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, position: 'relative' }}>
                      <Suspense fallback={<Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Cargando mapa...
                      </Box>}>
                        <LeafletMap 
                          position={mapLocation.lat && mapLocation.lng ? [mapLocation.lat, mapLocation.lng] : null}
                          setPosition={handleMapClick}
                          interactive={true}
                        />
                      </Suspense>
                    </Box>
                  </Box>
                </Collapse>
              </Box>

              <TextField
                label="Fecha de nacimiento"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />

              <FormControl fullWidth>
                <InputLabel>Idioma</InputLabel>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  label="Idioma"
                  sx={{ borderRadius: 2 }}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  label="Moneda"
                  sx={{ borderRadius: 2 }}
                >
                  {currencies.map((curr) => (
                    <MenuItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Biografía"
                name="description_markdown"
                value={formData.description_markdown}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
                placeholder="Cuéntanos algo sobre ti..."
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    }}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileSection;