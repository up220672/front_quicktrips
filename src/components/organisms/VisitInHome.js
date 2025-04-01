import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Button,
} from '@mui/material';
import {
  LocationOn,
  Star,
  Security,
  Payments,
  SupportAgent,
  Home,
  Apartment,
  Villa,
  Cabin
} from '@mui/icons-material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

// Hero images
const heroImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
];

// Property types
const propertyTypes = [
  { icon: <Home fontSize="large" />, name: 'Casas', count: '10,000+' },
  { icon: <Apartment fontSize="large" />, name: 'Departamentos', count: '15,000+' },
  { icon: <Villa fontSize="large" />, name: 'Villas', count: '5,000+' },
  { icon: <Cabin fontSize="large" />, name: 'Cabañas', count: '3,000+' }
];

// Benefits for guests
const guestBenefits = [
  {
    icon: <Star color="primary" fontSize="large" />,
    title: 'Alojamientos verificados',
    description: 'Todos nuestros espacios pasan por un riguroso proceso de verificación para garantizar tu seguridad y comodidad.'
  },
  {
    icon: <Payments color="primary" fontSize="large" />,
    title: 'Pago seguro',
    description: 'Tu transacción está protegida con encriptación de última generación. Paga con total confianza.'
  },
  {
    icon: <SupportAgent color="primary" fontSize="large" />,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible en cualquier momento para resolver tus dudas o problemas.'
  }
];

// Benefits for hosts
const hostBenefits = [
  {
    icon: <Payments color="primary" fontSize="large" />,
    title: 'Ganancias competitivas',
    description: 'Obtén ingresos adicionales con tu propiedad. Te ayudamos a establecer el precio ideal.'
  },
  {
    icon: <Security color="primary" fontSize="large" />,
    title: 'Protección de propiedad',
    description: 'Contamos con seguros y verificaciones de huéspedes para proteger tu inversión.'
  },
  {
    icon: <SupportAgent color="primary" fontSize="large" />,
    title: 'Gestión sencilla',
    description: 'Herramientas intuitivas para administrar reservas, precios y disponibilidad.'
  }
];

// Testimonials
const testimonials = [
  {
    name: 'María González',
    location: 'Cancún, México',
    text: 'Gracias a esta plataforma encontré el departamento perfecto para mis vacaciones. Todo fue exactamente como en las fotos y el proceso fue muy sencillo.',
    rating: 5
  },
  {
    name: 'Carlos Martínez',
    location: 'Buenos Aires, Argentina',
    text: 'Como anfitrión, he podido generar ingresos extras con mi casa de playa. La plataforma es muy fácil de usar y el soporte es excelente.',
    rating: 5
  },
  {
    name: 'Ana López',
    location: 'Madrid, España',
    text: 'Viajo frecuentemente por trabajo y siempre encuentro alojamientos cómodos y bien ubicados. Quicktrips hace que todo sea muy sencillo.',
    rating: 4
  }
];

// Animated component
const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = async () => {
    const loggedIn = await isAuthenticated(); // Verifica si el usuario está autenticado
    if (loggedIn) {
      navigate('/'); // Redirige a la página principal si está autenticado
    } else {
      navigate('/auth/login'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  };
  

  return (
    <ParallaxProvider>
      <Box sx={{ overflowX: 'hidden' }}>
        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            transition: 'background-image 1s ease-in-out'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  Descubre hogares alrededor del mundo
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  Encuentra el lugar perfecto para tu próxima aventura o comienza a ganar con tu propiedad
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita la propagación del evento
                      handleExploreClick(); // Llama a la función de redirección
                    }}
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Explorar alojamientos
                  </Button>
                </Box>
              </motion.div>
            </Container>
          </Box>

          {/* Scroll indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 40,
              animation: 'bounce 2s infinite'
            }}
          >
            <Typography variant="body2">Desplázate para descubrir</Typography>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Box
                sx={{
                  width: '24px',
                  height: '40px',
                  border: '2px solid white',
                  borderRadius: '12px',
                  position: 'relative',
                  mx: 'auto'
                }}
              >
                <Box
                  sx={{
                    width: '4px',
                    height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '2px',
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'scroll 2s infinite'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Property Types Section */}
        <Box sx={{ py: 10, backgroundColor: '#f9f9f9' }}>
          <Container>
            <AnimatedSection>
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 6 }}
              >
                Explora diferentes tipos de alojamiento
              </Typography>
            </AnimatedSection>

            <Grid container spacing={4} justifyContent="center">
              {propertyTypes.map((type, index) => (
                <Grid item xs={12} sm={6} md={3} key={type.name}>
                  <AnimatedSection delay={index * 0.1}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: 'primary.light',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          color: '#FFFFFF'
                        }}
                      >
                        {type.icon}
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {type.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {type.count} propiedades
                      </Typography>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Parallax Image Section */}
        <Box
          sx={{
            position: 'relative',
            height: '60vh',
            overflow: 'hidden'
          }}
        >
          {/* Capa de imagen de fondo */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              zIndex: 1
            }}
          />

          {/* Capa oscura semi-transparente */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 2
            }}
          />

          {/* Contenido (texto y botón) */}
          <Container
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              zIndex: 3  // Aseguramos que el contenido esté por encima de las otras capas
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h2"
                color="white"  // Cambiado a blanco para mejor contraste
                fontWeight="bold"
                gutterBottom
                sx={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  position: 'relative'  // Aseguramos que el texto esté por encima
                }}
              >
                Vive experiencias únicas
              </Typography>
              <Typography
                variant="h5"
                component="p"
                color="white"
                sx={{
                  maxWidth: '800px',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                  mb: 4,
                  position: 'relative'  // Aseguramos que el texto esté por encima
                }}
              >
                Descubre alojamientos que van más allá de un simple lugar para dormir.
                Desde casas en árbol hasta castillos históricos, encuentra espacios que harán tu viaje inolvidable.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleExploreClick}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  position: 'relative',  // Aseguramos que el botón esté por encima
                  zIndex: 4
                }}
              >
                Comenzar
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Benefits for Guests Section */}
        <Box sx={{ py: 10 }}>
          <Container>
            <AnimatedSection>
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 6 }}
              >
                ¿Por qué elegirnos como huésped?
              </Typography>
            </AnimatedSection>

            <Grid container spacing={4}>
              {guestBenefits.map((benefit, index) => (
                <Grid item xs={12} md={4} key={benefit.title}>
                  <AnimatedSection delay={index * 0.1}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        {benefit.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        textAlign="center"
                        gutterBottom
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                      >
                        {benefit.description}
                      </Typography>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits for Hosts Section */}
        <Box sx={{ py: 10, backgroundColor: '#f9f9f9' }}>
          <Container>
            <AnimatedSection>
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 6 }}
              >
                ¿Por qué anunciar tu propiedad con nosotros?
              </Typography>
            </AnimatedSection>

            <Grid container spacing={4}>
              {hostBenefits.map((benefit, index) => (
                <Grid item xs={12} md={4} key={benefit.title}>
                  <AnimatedSection delay={index * 0.1}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)'
                        }
                      }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        {benefit.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        textAlign="center"
                        gutterBottom
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                      >
                        {benefit.description}
                      </Typography>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <AnimatedSection>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Más información para anfitriones
                </Button>
              </AnimatedSection>
            </Box>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 10 }}>
          <Container>
            <AnimatedSection>
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 6 }}
              >
                Lo que dicen nuestros usuarios
              </Typography>
            </AnimatedSection>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={testimonial.name}>
                  <AnimatedSection delay={index * 0.1}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            color={i < testimonial.rating ? 'primary' : 'disabled'}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ flexGrow: 1, mb: 3, fontStyle: 'italic' }}
                      >
                        "{testimonial.text}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}, {testimonial.location}
                        </Typography>
                      </Box>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 10, backgroundColor: 'primary.main', color: 'white' }}>
          <Container>
            <AnimatedSection>
              <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} md={7}>
                  <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    ¿Listo para tu próxima aventura o para comenzar a ganar?
                  </Typography>
                  <Typography variant="h5" component="p" sx={{ mb: 4 }}>
                    Únete a nuestra comunidad de viajeros y anfitriones en más de 100 países.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleExploreClick}
                    sx={{
                      px: 6,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      mr: 2,
                      mb: { xs: 2, md: 0 }
                    }}
                  >
                    Explorar alojamientos
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita la propagación del evento
                      navigate('/preguntas-frecuentes'); // Redirige a la página de preguntas frecuentes
                    }}
                    size="large"
                    sx={{
                      px: 6,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    Preguntas frecuentes
                  </Button>
                </Grid>
              </Grid>
            </AnimatedSection>
          </Container>
        </Box>
      </Box>
    </ParallaxProvider>
  );
};

export default HomePage;