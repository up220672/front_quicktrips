import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Button, 
  Chip, 
  Grid, 
  Paper,
  Tabs,
  Tab,
  Rating,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Badge,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  LocationOn, 
  Star, 
  VerifiedUser, 
  Email, 
  Phone, 
  CalendarToday,
  Home,
  Apartment,
  Reviews,
  Description,
  Hotel
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { getUserIdFromToken } from '../../utils/auth'; // Importa tu función para obtener el ID del token

const UserProfile = () => {
  const { userId } = useParams(); // Obtén el userId de la URL
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token'); // Obtén el token desde las cookies

        // Obtener datos del usuario
        const userResponse = await axios.get(`https://backend.quicktrips.lat/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        // Obtener reseñas del usuario
        const reviewsResponse = await axios.get(`https://backend.quicktrips.lat/api/review/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserReviews(reviewsResponse.data.reviews || []);

      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Dependencia en userId para recargar si cambia

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const PropertyCard = ({ property }) => {
    if (!property || typeof property !== 'object') return null;
    
    return (
      <motion.div whileHover={{ y: -5 }}>
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={property.images?.[0] ? `https://backend.quicktrips.lat${property.images[0].url}` : ''}
              alt={property.title || 'Property image'}
              sx={{ objectFit: 'cover' }}
            />
            <Box sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 2
            }}>
              <Typography variant="subtitle2">
                ${property.price_per_night} <span style={{ fontWeight: 400 }}>/noche</span>
              </Typography>
            </Box>
          </Box>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {property.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOn fontSize="small" color="primary" />
              <Typography variant="body2">
                {property.address?.city}, {property.address?.state}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating value={property.rating || 0} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                {property.rating || 0} ({property.reviews?.length || 0} reseñas)
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const ReviewCard = ({ review }) => {
    if (!review || typeof review !== 'object') return null;
    
    const reviewDate = review.date ? 
      (typeof review.date === 'string' ? parseISO(review.date) : new Date(review.date.$date)) : 
      new Date();

    return (
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <Box ml={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {review.user_id?.name || 'Anónimo'}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <Rating value={review.score || 0} readOnly size="small" precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                {format(reviewDate, "MMMM yyyy", { locale: es })}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body1">
          {review.comment || 'Sin comentario'}
        </Typography>
      </Paper>
    );
  };

  const VerificationBadge = ({ verified, label }) => (
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {verified ? (
        <VerifiedUser color="success" fontSize="small" />
      ) : (
        <VerifiedUser color="disabled" fontSize="small" />
      )}
      <Typography variant="body2" color={verified ? "text.primary" : "text.disabled"}>
        {label} {verified ? "verificado" : "pendiente"}
      </Typography>
    </Box>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>No se encontraron datos del usuario</Typography>
      </Box>
    );
  }

  // Si el rol es 2 (admin), mostrar solo botón de dashboard
  if (userData.role === 2) {
    return (
      <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4, minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Como administrador, puedes acceder al panel de control para gestionar la plataforma.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 3 }}
        >
          Ir al Dashboard
        </Button>
      </Container>
    );
  }

  // Manejo seguro de la fecha de creación
  const createdAt = userData.created_at ? 
    (typeof userData.created_at === 'string' ? parseISO(userData.created_at) : new Date(userData.created_at.$date)) : 
    new Date();

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4 }}>
      {/* Profile Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: 4,
        mb: 4,
        p: isMobile ? 2 : 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: 1
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2
        }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: '50%',
                p: 0.5,
                boxShadow: 2
              }}>
                <VerifiedUser color="primary" fontSize="small" />
              </Box>
            }
          >
            <Avatar
              src={userData.profile_picture ? `https://backend.quicktrips.lat${userData.profile_picture}` : ''}
              sx={{ 
                width: isMobile ? 120 : 150, 
                height: isMobile ? 120 : 150,
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Badge>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700}>
              {userData.first_name || 'Usuario'} {userData.last_name || ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{userData.username}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Acerca de mí
          </Typography>
          <Typography variant="body1" paragraph>
            {userData.description_markdown || 'Este usuario no ha agregado una descripción.'}
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
            <Chip 
              icon={<CalendarToday />} 
              label={`Miembro desde ${format(createdAt, "MMMM yyyy", { locale: es })}`} 
              variant="outlined"
            />
            {userData.role === 1 && (
              <Chip 
                icon={<Hotel />} 
                label="Anfitrión verificado" 
                color="primary"
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - User Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Información de contacto
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={userData.email} 
                  secondaryTypographyProps={{ color: "text.primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Teléfono" 
                  secondary={userData.phone} 
                  secondaryTypographyProps={{ color: "text.primary" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Ubicación" 
                  secondary={
                    `${userData.address?.street || ''} ${userData.address?.exterior_number || ''}, ${userData.address?.neighborhood || ''}, ${userData.address?.city || ''}`
                  } 
                  secondaryTypographyProps={{ color: "text.primary" }}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Verificaciones
            </Typography>
            
            <VerificationBadge 
              verified={userData.is_identity_document_verified} 
              label="Identificación" 
            />
            <VerificationBadge 
              verified={userData.is_tax_document_verified} 
              label="Documento fiscal" 
            />
            <VerificationBadge 
              verified={userData.is_proof_of_residence_verified} 
              label="Comprobante de domicilio" 
            />
            <VerificationBadge 
              verified={userData.is_criminal_record_certificate_verified} 
              label="Antecedentes penales" 
            />
          </Paper>
        </Grid>

        {/* Right Column - Main Content */}
        <Grid item xs={12} md={8}>
          {/* Tabs */}
          <Paper elevation={0} sx={{ mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Home fontSize="small" /> 
                    <span>Historial de estancias</span>
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Reviews fontSize="small" /> 
                    <span>Mis reseñas</span>
                    {userReviews.length > 0 && (
                      <Chip 
                        label={userReviews.length} 
                        size="small" 
                        sx={{ ml: 1, height: 20 }} 
                      />
                    )}
                  </Box>
                } 
              />
              {userData.role === 1 && (
                <>
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Apartment fontSize="small" /> 
                        <span>Mis propiedades</span>
                        {userData.properties?.length > 0 && (
                          <Chip 
                            label={userData.properties.length} 
                            size="small" 
                            sx={{ ml: 1, height: 20 }} 
                          />
                        )}
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Description fontSize="small" /> 
                        <span>Borradores</span>
                      </Box>
                    } 
                  />
                </>
              )}
            </Tabs>
          </Paper>

          {/* Tab Content */}
          <Box>
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Historial de estancias
                </Typography>
                
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: `1px dashed ${theme.palette.divider}` }}>
                  <Hotel color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Aún no tienes estancias registradas.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Explorar propiedades
                  </Button>
                </Paper>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Mis Reseñas
                </Typography>
                
                {userReviews.length > 0 ? (
                  <Box>
                    {userReviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </Box>
                ) : (
                  <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: `1px dashed ${theme.palette.divider}` }}>
                    <Reviews color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Aún no has escrito reseñas.
                    </Typography>
                  </Paper>
                )}
              </motion.div>
            )}

            {activeTab === 2 && userData.role === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Mis Propiedades
                </Typography>
                
                {userData.properties?.length > 0 ? (
                  <Grid container spacing={3}>
                    {userData.properties.map((property) => (
                      <Grid item xs={12} sm={6} key={property._id}>
                        <PropertyCard property={property} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: `1px dashed ${theme.palette.divider}` }}>
                    <Typography variant="h6" color="text.secondary">
                      No tienes propiedades listadas aún.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Publicar propiedad
                    </Button>
                  </Paper>
                )}
              </motion.div>
            )}

            {activeTab === 3 && userData.role === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Borradores de Propiedades
                </Typography>
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: `1px dashed ${theme.palette.divider}` }}>
                  <Description color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No tienes borradores guardados.
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    Crear nueva propiedad
                  </Button>
                </Paper>
              </motion.div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;