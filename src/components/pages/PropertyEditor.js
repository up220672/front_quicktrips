import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../atoms/Loading';
import { 
  Container, 
  Paper, 
  Typography, 
  Box,
  Button,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from "js-cookie";
import axios from 'axios';
import initialPropertyState from '../../utils/initialPropertyState';

// Iconos
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';

// Componentes de pasos
import BasicInfoStep from '../organisms/EditProperty/BasicInfoStep';
import LocationStep from '../organisms/EditProperty/LocationStep';
import RoomsStep from '../organisms/EditProperty/RoomsStep';
import AmenitiesStep from '../organisms/EditProperty/AmenitiesStep';
import PhotosVideosStep from '../organisms/EditProperty/PhotosVideosStep';
import RulesStep from '../organisms/EditProperty/RulesStep';
import PDFStep from '../organisms/EditProperty/PDFsStep';
import PropertyStepper from '../organisms/EditProperty/PropertyStepper';
import DynamicNotification from '../atoms/NotificationAlert';
import { getUserIdFromToken } from '../../utils/auth';

const PropertyEditor = ({ propertyId, onClose = () => {} }) => {
  const [isNewProperty, setIsNewProperty] = useState(!propertyId);
  const API_BASE_URL = 'https://backend.quicktrips.lat';
  const theme = useTheme();
  const navigate = useNavigate();
  const [token] = useState(Cookies.get('token'));
  const [activeStep, setActiveStep] = useState(0);
  const [property, setProperty] = useState(initialPropertyState);
  const [loading, setLoading] = useState(true);
  const [draftId, setDraftId] = useState(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (propertyId) {

          const usuario = {
            user: getUserIdFromToken(),
          }

          const response = await axios.get(`${API_BASE_URL}/api/drafts/property/${propertyId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setDraftId(response.data.draft._id);
          localStorage.setItem('property_draft', response.data.draft._id);

          if (!response.data.isNew) {
            setNotification({
              isOpen: true,
              title: 'Borrador encontrado',
              message: 'Se encontró un borrador de esta propiedad. ¿Desea continuar editando?',
              type: 'info',
              cancelText: 'Descartar',
              confirmText: 'Continuar editando',
              onConfirm: () => {
                setProperty(response.data);
              },
              onClose: () => {
                setProperty(response.data);
              },
              onCancel: async () => {
                const new_response = await axios.post(`${API_BASE_URL}/api/drafts/property/${response.data.draft._id}/discard`, null, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setProperty(new_response.data);
              }
            });
          } else {
            setProperty(response.data);
          }
          setIsNewProperty(false);
        } else {
            // Crear un nuevo borrador vacío con los datos requeridos
            const response = await axios.post(
            `${API_BASE_URL}/api/drafts/property/empty`,
            {
              user : getUserIdFromToken(),
              draft_data: {
                ...initialPropertyState,
              },
            },
            {   
              headers: { Authorization: `Bearer ${token}` },
            }
            );

            console.log('Nuevo borrador creado:', response.data);
            setDraftId(response.data.draft._id);
            localStorage.setItem('property_draft', response.data.draft._id);
            setProperty(response.data);
            console.log("propiedad", property);
            setIsNewProperty(true);
        }
        setLoading(false);
      } catch (err) {
        console.error('FALLÓ: ', err);
        setNotification({
          isOpen: true,
          title: 'Ups! hubo un error',
          message: `${err.message}`,
          type: 'error',
          onConfirm: () => onClose(true),
        });
        setLoading(false);
      }
    };
      fetchProperty();
  }, [propertyId, token]);

  useEffect(() => {
    console.log("propiedad", property);
  }, [property]);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSaveDraft = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/drafts/property`, property, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        isOpen: true,
        title: 'Borrador guardado',
        message: 'El borrador de la propiedad se guardó correctamente.',
        type: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmText: 'Aceptar',
        onConfirm: () => onClose(true),
      });

      localStorage.setItem('property_draft', response.data.draft._id);
      setDraftId(response.data.draft._id);
    } catch (err) {
      setNotification({
        isOpen: true,
        title: 'Error',
        message: err.response?.data?.message || err.message,
        type: 'error',
        showCancelButton: false,
        showConfirmButton: true,
        confirmText: 'Aceptar',
        onConfirm: () => onClose(true),
      });
    }
  };

  const handleSendForReview = async () => {
    try {
      // First ensure we have a draft
      if (!draftId) {
        await handleSaveDraft();
      }

      // Use the appropriate endpoint based on whether it's a new property
      const endpoint = isNewProperty
        ? `${API_BASE_URL}/api/drafts/property/${draftId}/save-to-new-property`
        : `${API_BASE_URL}/api/drafts/property/${draftId}/save-to-property`;

      const response = await axios.post(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        isOpen: true,
        title: 'Éxito',
        message: isNewProperty 
          ? 'Nueva propiedad creada y enviada a revisión' 
          : 'Cambios enviados a revisión',
        type: 'success',
        onConfirm: () => {
          onClose(true);
          if (isNewProperty && response.data.propertyId) {
            navigate(`/property/${response.data.propertyId}`);
          }
        },
      });
    } catch (err) {
      console.error('Error:', err);
      setNotification({
        isOpen: true,
        title: 'Error',
        message: err.response?.data?.message || err.message,
        type: 'error',
        onConfirm: () => setNotification(prev => ({ ...prev, isOpen: false })),
      });
    }
  };

  const steps = [
    'Información básica',
    'Ubicación',
    'Habitaciones',
    'Comodidades',
    'Fotos y videos',
    'Reglas',
    'Documentos',
  ];

  const getStepContent = (step) => {
    const commonProps = {
      property,
      setProperty,
      theme,
    };

    switch (step) {
      case 0: return <BasicInfoStep {...commonProps} />;
      case 1: return <LocationStep {...commonProps} />;
      case 2: return <RoomsStep {...commonProps} />;
      case 3: return <AmenitiesStep {...commonProps} />;
      case 4: return <PhotosVideosStep {...commonProps} />;
      case 5: return <RulesStep {...commonProps} />;
      case 6: return <PDFStep {...commonProps} />;
      default: return 'Unknown step';
    }
  };

  if (loading) return <Loading message="Cargando propiedad..." />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          {propertyId ? 'Editar propiedad' : 'Añadir nueva propiedad'}
        </Typography>

        <PropertyStepper activeStep={activeStep} steps={steps} />

        <Box sx={{ mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        {/* Botones en una sola fila */}
        <Stack 
          direction="row" 
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          {/* Botón Atrás */}
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={activeStep === 0 ? () => navigate('/') : handleBack}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              py: 1.5,
              px: 3,
            }}
          >
            Atrás
          </Button>

          {/* Botón Guardar borrador */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleSaveDraft}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              py: 1.5,
              px: 3,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
                backgroundColor: theme.palette.secondary.dark
              }
            }}
          >
            Guardar borrador
          </Button>

          {/* Botón Siguiente/Enviar a revisión */}
          <Button
            variant="contained"
            color="primary"
            startIcon={activeStep === steps.length - 1 ? <SendIcon /> : <ArrowForwardIcon />}
            onClick={activeStep === steps.length - 1 ? handleSendForReview : handleNext}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              py: 1.5,
              px: 3,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
                backgroundColor: theme.palette.primary.dark
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Enviar a revisión' : 'Siguiente'}
          </Button>
        </Stack>
      </Paper>

      <DynamicNotification
        isOpen={notification.isOpen}
        onClose={() => {
          if (notification.onClose) {
            notification.onClose();
          }
          setNotification(prev => ({ ...prev, isOpen: false }));
        }}
        onCancel={
          notification.onCancel
            ? () => {
                notification.onCancel();
                setNotification(prev => ({ ...prev, isOpen: false }));
              }
            : undefined
        }
        onConfirm={() => {
          if (notification.onConfirm) {
            notification.onConfirm();
          }
          setNotification(prev => ({ ...prev, isOpen: false }));
        }}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        cancelText={notification.cancelText}
        confirmText={notification.confirmText}
        showCloseButton={notification.showCloseButton !== false}
        showConfirmButton={notification.showConfirmButton !== false && !!notification.onConfirm}
        showCancelButton={notification.showCancelButton !== false}
      />
    </Container>
  );
};

export default PropertyEditor;