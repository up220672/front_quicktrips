import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Divider, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  useMediaQuery,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContainedButton } from "../atoms/Button";
import { ReactComponent as FAQIllustration } from '../../assets/images/faq-illustration.svg';
import { motion } from 'framer-motion';

// Preguntas frecuentes genéricas
const faqs = [
  {
    question: "¿Cómo puedo registrarme en la plataforma?",
    answer: "Para registrarte en la plataforma, simplemente debes crear una cuenta proporcionando tu correo electrónico y una contraseña segura. Este proceso es rápido y sencillo, y te permitirá acceder a todas las funcionalidades disponibles. Asegúrate de utilizar una contraseña única y difícil de adivinar para proteger tu cuenta.",
    category: "General"
  },
  {
    question: "¿Es necesario pagar para usar la plataforma?",
    answer: "El acceso a la plataforma es gratuito para explorar las opciones disponibles y familiarizarte con las funcionalidades. Sin embargo, algunos servicios o características adicionales pueden requerir un pago. Antes de realizar cualquier transacción, se te proporcionará información clara sobre los costos asociados para que puedas tomar una decisión informada.",
    category: "Pagos"
  },
  {
    question: "¿En qué lugares está disponible el servicio?",
    answer: "El servicio está diseñado para ser accesible en una variedad de ubicaciones. Actualmente, cubrimos varias regiones y estamos trabajando constantemente para expandir nuestra disponibilidad. Te recomendamos consultar la plataforma para verificar si el servicio está disponible en tu área específica.",
    category: "Cobertura"
  },
  {
    question: "¿Cómo se protegen mis datos personales?",
    answer: "La protección de tus datos personales es una prioridad para nosotros. Utilizamos tecnologías avanzadas de encriptación para garantizar que tu información esté segura. Además, cumplimos con todas las normativas de privacidad aplicables y te ofrecemos herramientas para gestionar tus preferencias de privacidad directamente desde tu cuenta.",
    category: "Seguridad"
  },
  {
    question: "¿Qué métodos de pago puedo usar?",
    answer: "Aceptamos una variedad de métodos de pago seguros para facilitar tus transacciones. Esto incluye opciones como tarjetas de crédito y débito, así como otros métodos digitales. Las opciones específicas pueden variar según tu ubicación, pero siempre nos aseguramos de ofrecer alternativas confiables y convenientes.",
    category: "Pagos"
  },
  {
    question: "¿Cómo funcionan las cancelaciones?",
    answer: "Las políticas de cancelación pueden variar dependiendo del tipo de servicio que hayas seleccionado. Antes de confirmar cualquier reserva o transacción, te recomendamos revisar los términos y condiciones específicos relacionados con las cancelaciones. Esto te permitirá tomar decisiones informadas y evitar inconvenientes.",
    category: "Reservas"
  },
  {
    question: "¿Qué beneficios obtengo al usar la plataforma?",
    answer: "Al utilizar nuestra plataforma, puedes disfrutar de una experiencia optimizada que te permite acceder a una amplia gama de opciones y servicios. Además, ofrecemos soporte al cliente dedicado para resolver cualquier duda o problema que puedas tener, así como herramientas diseñadas para facilitar tu experiencia.",
    category: "General"
  },
  {
    question: "¿Cómo se asegura la calidad del servicio?",
    answer: "Nos esforzamos por garantizar la calidad de los servicios ofrecidos en la plataforma. Esto incluye realizar verificaciones periódicas y recopilar comentarios de los usuarios para identificar áreas de mejora. Nuestro objetivo es ofrecerte una experiencia confiable y satisfactoria en todo momento.",
    category: "Calidad"
  }
];

// Componente de categorías
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      gap: 2,
      mb: 4
    }}>
      {categories.map((category, index) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ContainedButton
            onPress={() => setActiveCategory(category)}
            sx={{
              backgroundColor: activeCategory === category ? 
                'primary.main' : 'primary.light',
              color: activeCategory === category ? 
                'white' : 'primary.contrastText',
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize'
            }}
          >
            {category}
          </ContainedButton>
        </motion.div>
      ))}
    </Box>
  );
};

export default function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const categories = [...new Set(faqs.map(faq => faq.category))];
  const [activeCategory, setActiveCategory] = useState('Todas');
  
  // Filtrar FAQs por categoría
  const filteredFaqs = activeCategory === 'Todas' ? 
    faqs : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        backgroundColor: theme.palette.background.default, 
        py: 8,
        minHeight: '100vh'
      }}>
        <Container maxWidth="lg">
          {/* Encabezado con animación */}
          <Fade in timeout={800}>
            <Box textAlign="center" sx={{ mb: 6 }}>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2,
                  fontSize: isMobile ? '2rem' : '3rem'
                }}
              >
                Preguntas Frecuentes
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  maxWidth: '700px',
                  mx: 'auto'
                }}
              >
                Encuentra respuestas a las dudas más comunes sobre nuestra plataforma. 
                Si no encuentras lo que buscas, nuestro equipo de soporte está disponible 24/7.
              </Typography>
            </Box>
          </Fade>

          {/* Ilustración animada */}
          <Slide direction="up" in timeout={1000}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 6,
              maxWidth: '500px',
              mx: 'auto'
            }}>
              <FAQIllustration style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Slide>

          {/* Filtro por categorías */}
          <CategoryFilter 
            categories={['Todas', ...categories]} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Lista de FAQs con animaciones */}
          {filteredFaqs.map((faq, index) => (
            <Grow in timeout={(index + 1) * 200} key={index}>
              <Box sx={{ mb: 3 }}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Accordion
                    expanded={openIndex === index}
                    onChange={() => toggleFAQ(index)}
                    sx={{
                      borderRadius: '12px !important',
                      boxShadow: theme.shadows[3],
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[6]
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExpandMoreIcon sx={{ fontSize: '2rem' }} />
                        </motion.div>
                      }
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        minHeight: '72px !important',
                        '& .MuiAccordionSummary-content': {
                          alignItems: 'center'
                        }
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.getContrastText(
                            theme.palette.primary.light
                          ),
                          flex: 1
                        }}
                      >
                        {faq.question}
                      </Typography>
                      <Box 
                        sx={{ 
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          ml: 2
                        }}
                      >
                        {faq.category}
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ 
                        backgroundColor: theme.palette.background.paper,
                        padding: '24px'
                      }}
                    >
                      <Typography variant="body1">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              </Box>
            </Grow>
          ))}

          {/* CTA final */}
          <Fade in timeout={1500}>
            <Box textAlign="center" sx={{ mt: 8 }}>
              <Typography 
                variant="h5" 
                component="h3"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                ¿No encontraste lo que buscabas?
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ContainedButton
                  component="a" // Cambia el botón para que sea un enlace
                  href="mailto:contact@quicktrips.lat" // Usa mailto para abrir el cliente de correo
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    textDecoration: 'none', // Asegura que no haya subrayado en el texto
                    display: 'inline-block' // Asegura que se comporte como un botón
                  }}
                >
                  Contactar a nuestro equipo de soporte
                </ContainedButton>
              </motion.div>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}