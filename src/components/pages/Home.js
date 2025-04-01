import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Button, 
  Rating,
  Container,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { 
  LocationOn, 
  Star, 
  Hotel, 
  BathtubOutlined, 
  KingBedOutlined,
  PeopleOutlined,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import { isAuthenticated } from '../../utils/auth';
import Loading from '../atoms/Loading';
import { isEmailConfirmed } from '../../utils/auth';
import VisitInHome from '../organisms/VisitInHome';
import DynamicNotification from '../atoms/NotificationAlert';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Formatear el precio
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: property.currency || 'MXN'
  }).format(property.price_per_night);

  // Manejar clic en favoritos
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Aquí podrías agregar la lógica para guardar en favoritos
  };

  // Manejar clic en la propiedad
  const handleCardClick = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <Card sx={{ 
        borderRadius: 3, 
        overflow: 'hidden', 
        boxShadow: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Imagen principal con botón de favoritos */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={property.photos?.[0]?.url ? `https://backend.quicktrips.lat${property.photos[0].url}` : '/placeholder-property.jpg'}
            alt={property.title}
            sx={{ objectFit: 'cover' }}
          />
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder color="disabled" />
            )}
          </IconButton>
        </Box>

        {/* Contenido de la tarjeta */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {property.title || 'Propiedad sin título'}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} color="primary">
              {formattedPrice}
              <Typography component="span" variant="caption" color="text.secondary">
                /noche
              </Typography>
            </Typography>
          </Box>

          {/* Ubicación */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <LocationOn fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {property.address?.city || 'Ubicación no disponible'}
            </Typography>
          </Box>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={property.rating || 0} 
              precision={0.5} 
              readOnly 
              size="small" 
              emptyIcon={<Star fontSize="inherit" color="disabled" />}
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              ({property.reviews?.length || 0} reseñas)
            </Typography>
          </Box>

          {/* Características principales */}
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <KingBedOutlined fontSize="small" color="action" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {property.bedrooms_count || 0} hab.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BathtubOutlined fontSize="small" color="action" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {property.bathrooms_count || 0} baños
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleOutlined fontSize="small" color="action" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {property.max_guests || 1}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Tipo de propiedad */}
          <Chip
            label={getPropertyType(property.type)}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Función para obtener el tipo de propiedad
const getPropertyType = (type) => {
  const types = [
    'Casa completa',
    'Departamento',
    'Cabaña',
    'Habitación privada',
    'Casa de campo',
    'Villa'
  ];
  return types[type] || 'Propiedad';
};

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProperties = async () => {
      const token = Cookies.get('token');
      
      try {
        const response = await axios.get('https://backend.quicktrips.lat/api/properties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar propiedades');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h6">No hay propiedades disponibles</Typography>
        <Typography variant="body1" color="text.secondary">
          Prueba ajustando tus filtros de búsqueda
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 4, textAlign: isMobile ? 'center' : 'left' }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Descubre propiedades increíbles
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Encuentra el lugar perfecto para tu próxima aventura
        </Typography>
      </Box>

      {/* Grid de propiedades */}
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Actualizar el componente Home para usar PropertyGrid
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [emailConfirmed, setEmailConfirmed] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkAuthAndEmail = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const confirmed = await isEmailConfirmed();
        setEmailConfirmed(confirmed);
        setShowNotification(!confirmed);
      } else {
        setEmailConfirmed(false);
      }
    };

    checkAuthAndEmail();
  }, []);

  if (isLoggedIn === null || emailConfirmed === null) {
    return <Loading message="Cargando..." />;
  }

  return (
    <>
      {isLoggedIn ? <PropertyGrid /> : <VisitInHome />}
      
      {showNotification && (
        <DynamicNotification
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
          onConfirm={() => {
            window.location.href = '/verify-email';
          }}
          title="Verificación requerida"
          message="Para acceder a todas las funciones de la plataforma, por favor verifica tu dirección de correo electrónico."
          closeText="Más tarde"
          confirmText="Verificar ahora"
          icon={<EmailIcon color="primary" />}
        />
      )}
    </>
  );
};

export default Home;