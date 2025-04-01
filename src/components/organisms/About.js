import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useMediaQuery,
  Avatar,
  Chip
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { 
  Home, 
  EmojiPeople, 
  Public, 
  Star, 
  LocalActivity,
  Hotel,
  DirectionsCar,
  Restaurant
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth'; // Importa la función de autenticación

// Animaciones
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10 
    } 
  }
};

// Datos del equipo
const teamMembers = [
  {
    name: "Daniel Pedroza",
    role: "CEO",
    bio: "Apasionado por conectar a las personas con espacios únicos y ofrecer experiencias memorables a través de la innovación y la tecnología.",
    avatar: "/images/team_3.jpg"
  },
  {
    name: "Pedro Luevano",
    role: "Desarrollador Full Stack",
    bio: "Especialista en el desarrollo de plataformas de alojamiento, creando experiencias personalizadas y optimizadas para cada huésped.",
    avatar: "/images/team_2.jpg"
  },
  {
    name: "Hugo Hernández",
    role: "Fundador y vicepresidente",
    bio: "Líder tecnológico comprometido con el desarrollo de una plataforma intuitiva, eficiente y escalable para mejorar la experiencia del usuario.",
    avatar: "/images/team_1.jpg"
  },
  {
    name: "Yeshua Hernández",
    role: "Ingeniero DevOps",
    bio: "Experto en infraestructura y automatización, asegurando el rendimiento, la seguridad y la escalabilidad de la plataforma.",
    avatar: "/images/team_4.jpg"
  }
];

// Estadísticas
const stats = [
  { value: "50K+", label: "Huéspedes satisfechos", icon: <EmojiPeople fontSize="large" /> },
  { value: "120+", label: "Ciudades disponibles", icon: <Public fontSize="large" /> },
  { value: "4.9", label: "Calificación promedio", icon: <Star fontSize="large" /> },
  { value: "24/7", label: "Soporte disponible", icon: <LocalActivity fontSize="large" /> }
];

// Servicios
const services = [
  { icon: <Home fontSize="large" />, name: "Alojamientos Únicos", description: "Encuentra espacios únicos y acogedores para tu próxima estadía." },
  { icon: <DirectionsCar fontSize="large" />, name: "Movilidad Fácil", description: "Opciones de transporte para que llegues a tu destino sin complicaciones." },
  { icon: <Restaurant fontSize="large" />, name: "Experiencias Locales", description: "Descubre actividades y gastronomía auténtica cerca de tu alojamiento." },
  { icon: <Hotel fontSize="large" />, name: "Estancias Premium", description: "Opciones de lujo para quienes buscan lo mejor en comodidad y estilo." }
];

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate(); // Hook para redirigir

  const handleExploreClick = async () => {
    const loggedIn = await isAuthenticated(); // Verifica si el usuario está autenticado
    if (loggedIn) {
      navigate('/'); // Redirige a la página principal si está autenticado
    } else {
      navigate('/auth/login'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        backgroundColor: theme.palette.background.default, 
        py: 8,
        overflow: 'hidden'
      }}>
        {/* Hero Section */}
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  mb: 3,
                  fontSize: isMobile ? '2.5rem' : '3.5rem'
                }}
              >
                Más que alojamientos, creamos <Box component="span" sx={{ color: theme.palette.secondary.main }}>experiencias</Box>
              </Typography>
              <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                  color: theme.palette.text.secondary,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                En QuickTrips, conectamos a las personas con espacios únicos y experiencias auténticas, transformando cada estadía en un recuerdo inolvidable.
              </Typography>
            </Box>
          </motion.div>

          {/* Misión y Visión */}
          <Grid container spacing={6} sx={{ mb: 10 }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideInFromLeft}
              >
                <Box sx={{ 
                  backgroundColor: theme.palette.primary.light,
                  p: 5,
                  borderRadius: 4,
                  height: '100%',
                  boxShadow: theme.shadows[4]
                }}>
                  <Home sx={{ 
                    fontSize: '3rem', 
                    color: "#FFFFFF",
                    mb: 2
                  }} />
                  <Typography 
                    variant="h4" 
                    component="h2"
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.getContrastText(theme.palette.primary.light),
                      mb: 3
                    }}
                  >
                    Nuestra Misión
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.getContrastText(theme.palette.primary.light),
                      lineHeight: 1.8,
                      fontSize: '1.1rem'
                    }}
                  >
                    Facilitar el acceso a alojamientos únicos y experiencias auténticas, conectando a anfitriones y huéspedes a través de una plataforma confiable y fácil de usar. Nos esforzamos por crear conexiones significativas y recuerdos inolvidables.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideInFromRight}
              >
                <Box sx={{ 
                  backgroundColor: theme.palette.secondary.light,
                  p: 5,
                  borderRadius: 4,
                  height: '100%',
                  boxShadow: theme.shadows[4]
                }}>
                  <Public sx={{ 
                    fontSize: '3rem', 
                    color: "#FFFFFF",
                    mb: 2
                  }} />
                  <Typography 
                    variant="h4" 
                    component="h2"
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.getContrastText(theme.palette.secondary.light),
                      mb: 3
                    }}
                  >
                    Nuestra Visión
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.getContrastText(theme.palette.secondary.light),
                      lineHeight: 1.8,
                      fontSize: '1.1rem'
                    }}
                  >
                    Ser la plataforma líder en alojamientos únicos y experiencias auténticas, conectando a millones de personas en todo el mundo. Visualizamos un futuro donde cada estadía sea personalizada, accesible y sostenible.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Nuestra Historia */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box sx={{ 
              backgroundColor: theme.palette.background.paper,
              p: 6,
              borderRadius: 4,
              boxShadow: theme.shadows[2],
              mb: 10,
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, transparent 100%)`,
                opacity: 0.1,
                zIndex: 0
              }
            }}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 4,
                  position: 'relative'
                }}
              >
                Nuestra Historia
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: theme.palette.text.primary,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  mb: 4,
                  position: 'relative'
                }}
              >
                QuickTrips nació con la idea de conectar a las personas con espacios únicos y anfitriones apasionados. Desde nuestros inicios, hemos crecido para ofrecer miles de opciones de alojamiento en todo el mundo, siempre enfocados en brindar experiencias auténticas y memorables.
              </Typography>
            </Box>
          </motion.div>

          {/* Nuestros Servicios */}
          <Box sx={{ mb: 10 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 6,
                textAlign: 'center'
              }}
            >
              Nuestro <Box component="span" sx={{ color: theme.palette.secondary.main }}>Ecosistema</Box>
            </Typography>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    variants={bounceIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box sx={{ 
                      backgroundColor: theme.palette.background.paper,
                      p: 4,
                      borderRadius: 3,
                      boxShadow: theme.shadows[3],
                      height: '100%',
                      textAlign: 'center',
                      borderBottom: `4px solid ${theme.palette.primary.main}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[6]
                      }
                    }}>
                      <Box sx={{ 
                        color: theme.palette.primary.main,
                        mb: 3,
                        fontSize: '2.5rem'
                      }}>
                        {service.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h3"
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          mb: 2
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Nuestro Equipo */}
          <Box sx={{ mb: 10 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 6,
                textAlign: 'center'
              }}
            >
              Conoce al <Box component="span" sx={{ color: theme.palette.secondary.main }}>Equipo</Box>
            </Typography>
            
            {/* Contenedor con altura fija para todas las tarjetas */}
            <Grid container spacing={4} justifyContent="center" sx={{ alignItems: 'stretch' }}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    variants={bounceIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.15 }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <Box sx={{ 
                      backgroundColor: theme.palette.background.paper,
                      p: 4,
                      borderRadius: 3,
                      boxShadow: theme.shadows[3],
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[6]
                      },
                      height: '500px' // Altura fija para todas las tarjetas
                    }}>
                      {/* Avatar con tamaño consistente */}
                      <Box sx={{ 
                        height: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <Avatar
                          src={member.avatar}
                          sx={{ 
                            width: 120, 
                            height: 120,
                            mx: 'auto',
                            mb: 2,
                            border: `3px solid ${theme.palette.primary.main}`
                          }}
                        />
                      </Box>
                      
                      {/* Nombre y rol */}
                      <Box sx={{ mb: 2, minHeight: '80px' }}>
                        <Typography 
                          variant="h5" 
                          component="h3"
                          sx={{ 
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            mb: 1
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Chip
                          label={member.role}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      
                      {/* Biografía con scroll si es necesario */}
                      <Box sx={{ 
                        flexGrow: 1,
                        overflow: 'hidden',
                        mb: 2
                      }}>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6,
                            maxHeight: '200px',
                            overflowY: 'auto',
                            pr: 1,
                            '&::-webkit-scrollbar': {
                              width: '4px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: theme.palette.primary.light,
                              borderRadius: '2px'
                            }
                          }}
                        >
                          {member.bio}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Box sx={{ 
              backgroundColor: theme.palette.primary.main,
              p: 6,
              borderRadius: 4,
              textAlign: 'center',
              color: 'white'
            }}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 800,
                  mb: 3
                }}
              >
                ¿Listo para tu próxima estadía?
              </Typography>
              <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                  mb: 4,
                  maxWidth: '700px',
                  mx: 'auto',
                  opacity: 0.9
                }}
              >
                Descubre cómo QuickTrips puede transformar tu experiencia de hospedaje con espacios únicos y anfitriones apasionados.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  component="button"
                  onClick={handleExploreClick} // Agrega el manejador de clic
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.getContrastText(theme.palette.secondary.main),
                    border: 'none',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[6]
                    }
                  }}
                >
                  Explorar Alojamientos
                </Box>
              </motion.div>
            </Box>
          </motion.div>

        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUs;