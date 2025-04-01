import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Carousel,
  Rate,
  Divider,
  Button,
  Space,
  Tooltip,
  Collapse,
  DatePicker,
  InputNumber,
  message
} from 'antd';
import {
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  FireOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import { BedOutlined, BathtubOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import '../../assets/css/PropertyDetail.css';
import Loading from '../atoms/Loading';
import DynamicNotification from '../atoms/NotificationAlert';
import LeafletMap from '../../utils/MapComponent';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const PropertyDetail = () => {
  const theme = useTheme();
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [activeAmenitiesTab, setActiveAmenitiesTab] = useState('essentials');
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [pets, setPets] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      const token = Cookies.get('token');

      try {
        const response = await axios.get(`http://localhost:3001/api/property/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperty(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Propiedad no encontrada');
        setNotification({
          isOpen: true,
          title: 'Error',
          message: err.response?.data?.message || 'Propiedad no encontrada',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const toggleFavorite = () => setFavorite(!favorite);

  const handleDateChange = (dates, dateStrings) => {
    setDates(dates);
  };

  const disabledDate = (current) => {
    // Deshabilitar fechas pasadas
    return current && current < moment().startOf('day');
  };

  const handleBooking = async () => {
    if (!dates || dates.length < 2) {
      message.error('Por favor selecciona las fechas de tu estancia');
      return;
    }

    if (guests > (property?.max_guests || 1)) {
      message.error(`El número máximo de huéspedes es ${property.max_guests}`);
      return;
    }

    if (pets > 0 && !property?.amenities?.pets_allowed) {
      message.error('Esta propiedad no permite mascotas');
      return;
    }

    setBookingLoading(true);
    const token = Cookies.get('token');

    try {
      const bookingData = {
        property_id: propertyId,
        check_in: dates[0].toISOString(),
        check_out: dates[1].toISOString(),
        guests,
        pets
      };

      const response = await axios.post(
        'http://localhost:3001/api/booking',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success('Reserva creada exitosamente!');
      navigate('/bookings'); // Redirigir a la página de reservas
    } catch (err) {
      console.error('Error al crear reserva:', err);
      message.error(err.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setBookingLoading(false);
    }
  };

  const renderAmenities = () => {
    if (!property || !property.amenities) return null;

    const essentials = [
      { name: 'Wi-Fi', value: property.amenities.wifi, icon: <WifiOutlined /> },
      { 
        name: 'Estacionamiento', 
        value: property.amenities.private_parking || property.amenities.street_parking, 
        icon: <CarOutlined /> 
      },
      { name: 'Cocina', value: property.has_kitchen, icon: <CoffeeOutlined /> },
      { 
        name: 'Calefacción', 
        value: property.amenities.fire_extinguisher, // Nota: Esto debería ser heating, no fire_extinguisher
        icon: <FireOutlined /> 
      },
      { 
        name: 'Seguridad', 
        value: property.amenities.security_system, 
        icon: <SafetyCertificateOutlined /> 
      }
    ].filter(item => item.value);

    // Filtrar todas las amenities que están en true y no son las esenciales
    const standoutAmenities = Object.entries(property.amenities)
      .filter(([key, value]) => {
        const essentialKeys = ['wifi', 'private_parking', 'street_parking', 'security_system', 'fire_extinguisher'];
        return value && typeof value === 'boolean' && !essentialKeys.includes(key);
      })
      .map(([key]) => {
        // Formatear el nombre para mostrar
        return key.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      });

    return (
      <div className="amenities-section">
        <h3 style={{ color: theme.palette.text.primary }}>Lo que este lugar ofrece</h3>
        <div className="amenities-tabs">
          <button
            className={`amenities-tab ${activeAmenitiesTab === 'essentials' ? 'active' : ''}`}
            onClick={() => setActiveAmenitiesTab('essentials')}
            style={{
              backgroundColor: activeAmenitiesTab === 'essentials' ? theme.palette.primary.main : 'transparent',
              color: activeAmenitiesTab === 'essentials' ? theme.palette.primary.contrastText : theme.palette.text.primary,
            }}
          >
            Esenciales
          </button>
          <button
            className={`amenities-tab ${activeAmenitiesTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveAmenitiesTab('all')}
            style={{
              backgroundColor: activeAmenitiesTab === 'all' ? theme.palette.primary.main : 'transparent',
              color: activeAmenitiesTab === 'all' ? theme.palette.primary.contrastText : theme.palette.text.primary,
            }}
          >
            Todas las comodidades
          </button>
        </div>

        {activeAmenitiesTab === 'essentials' && (
          <div className="amenities-grid">
            {essentials.map((item, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon" style={{ color: theme.palette.primary.main }}>{item.icon}</span>
                <span style={{ color: theme.palette.text.primary }}>{item.name}</span>
              </div>
            ))}
          </div>
        )}

        {activeAmenitiesTab === 'all' && (
          <div className="amenities-grid">
            {standoutAmenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon" style={{ color: theme.palette.primary.main }}>✓</span>
                <span style={{ color: theme.palette.text.primary }}>{amenity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const formatLocation = () => {
    if (!property?.address) return 'Ubicación no disponible';
    
    const { city, state, country } = property.address;
    // Corregir inconsistencias en los datos de ubicación
    const displayCity = city === 'New York' && country === 'México' ? 'Ciudad de México' : city;
    const displayState = state === 'Japon' ? 'CDMX' : state;
    
    return `${displayCity}, ${displayState}, ${country}`;
  };

  const formatFullAddress = () => {
    if (!property?.address) return 'Dirección no disponible';
  
    const { street, exterior_number, interior_number, neighborhood, city, state, postal_code, country } = property.address;
  
    return `${street} ${exterior_number}${interior_number ? ` Int. ${interior_number}` : ''}, ${neighborhood}, ${city}, ${state}, ${postal_code}, ${country}`;
  };

  if (loading) {
    return <Loading message="Cargando propiedad..." />;
  }

  if (error) {
    return (
      <div className="property-container error-message">
        <DynamicNotification
          isOpen={notification.isOpen}
          onClose={() => setNotification({ ...notification, isOpen: false })}
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
        Error: {error}
      </div>
    );
  }

  if (!property) {
    return <div className="property-container">Propiedad no encontrada</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="property-container"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      {/* Encabezado con título y acciones */}
      <div className="property-header">
        <h1 className="property-title" style={{ color: theme.palette.text.primary }}>
          {property.title || 'Propiedad hermosa'}
        </h1>
      </div>

      {/* Carrusel de imágenes */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="property-carousel"
      >
        {property.photos?.length > 0 ? (
          <Carousel autoplay>
            {property.photos.map((photo, index) => (
              <div key={index}>
                <img 
                  src={photo.url || photo} 
                  alt={`Vista de la propiedad ${index + 1}`} 
                  className="property-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-property.jpg';
                  }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="property-image-placeholder">
            <HomeOutlined style={{ fontSize: '48px', color: theme.palette.text.secondary }} />
            <p style={{ color: theme.palette.text.secondary }}>No hay fotos disponibles</p>
          </div>
        )}
      </motion.div>

      {/* Contenido principal */}
      <div className="property-content">
        <div className="property-details">
          {/* Información básica */}
          <div className="property-meta">
            <Space size="large">
              <span style={{ color: theme.palette.text.primary }}>
                <BedOutlined /> {property.bedrooms_count || 0} habitaciones
              </span>
              <span style={{ color: theme.palette.text.primary }}>
                <BathtubOutlined /> {property.bathrooms_count || 0} baños
              </span>
              <span style={{ color: theme.palette.text.primary }}>
                <UserOutlined /> Capacidad para {property.max_guests || 1} personas
              </span>
            </Space>
          </div>

          {/* Ubicación */}
          <div className="property-location" style={{ color: theme.palette.text.secondary }}>
            <EnvironmentOutlined /> {formatFullAddress()}
          </div>

          {/* Dirección y mapa */}
          <div className="property-location-map">
            <div style={{ height: '400px', marginTop: '20px' }}>
              <LeafletMap
                position={[property.address.latitude, property.address.longitude]}
                setPosition={() => {}} // No necesitas actualizar la posición en este caso
              />
            </div>
          </div>

          {/* Separador */}
          <Divider className="property-divider" />

          {/* Descripción */}
          <div className="property-description">
            <h3 style={{ color: theme.palette.text.primary }}>Acerca de este lugar</h3>
            <p style={{ color: theme.palette.text.secondary }}>
              {property.markdown_description || 'Esta hermosa propiedad ofrece una estadía cómoda con todas las comodidades necesarias.'}
            </p>
          </div>

          {/* Comodidades */}
          {renderAmenities()}

          {/* Reseñas */}
          <div className="property-reviews">
            <h3 style={{ color: theme.palette.text.primary }}>Reseñas</h3>
            {property.reviews?.length > 0 ? (
              property.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <Rate 
                    disabled 
                    defaultValue={review.score || review.rating || 3} // Valor por defecto si no hay rating
                  />
                  <p style={{ color: theme.palette.text.secondary }}>
                    {review.comment || 'El huésped no dejó un comentario.'}
                  </p>
                  <span className="review-author" style={{ color: theme.palette.text.secondary }}>
                    - {review.author || 'Anónimo'}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: theme.palette.text.secondary }}>Aún no hay reseñas</p>
            )}
          </div>
        </div>

        {/* Tarjeta de reserva */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="booking-card"
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <div className="booking-price">
            <span className="price" style={{ color: theme.palette.primary.main }}>
              ${property.price_per_night || 0} {property.currency || 'USD'}
            </span>
            <span className="price-period" style={{ color: theme.palette.text.secondary }}>
              por noche
            </span>
          </div>

          <div className="booking-dates">
            <RangePicker
              style={{ width: '100%' }}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
              placeholder={['Check-in', 'Check-out']}
            />
          </div>

          <div className="booking-guests">
            <label style={{ color: theme.palette.text.primary }}>Huéspedes</label>
            <InputNumber
              min={1}
              max={property.max_guests || 1}
              defaultValue={1}
              onChange={setGuests}
              style={{ width: '100%' }}
            />
          </div>

          {property.amenities?.pets_allowed && (
            <div className="booking-pets" style={{ marginTop: '10px' }}>
              <label style={{ color: theme.palette.text.primary }}>Mascotas</label>
              <InputNumber
                min={0}
                max={2}
                defaultValue={0}
                onChange={setPets}
                style={{ width: '100%' }}
              />
            </div>
          )}

          <Button
            type="primary"
            block
            className="booking-button"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              marginTop: '20px',
            }}
            onClick={handleBooking}
            loading={bookingLoading}
            disabled={!dates || dates.length < 2}
          >
            Reservar
          </Button>

          <div className="booking-notice" style={{ color: theme.palette.text.secondary }}>
            No se te cobrará todavía
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;