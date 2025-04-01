import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container,
  Button,
  Avatar,
  useScrollTrigger,
  Slide,
  Badge,
  MenuItem
} from '@mui/material';
import { 
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Favorite
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';

const pages = [
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { name: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' }
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function GuestAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: (theme) => theme.palette.primary.dark, // Usa el color principal del tema
          color: (theme) => theme.palette.primary.light, // Usa el color de texto principal del tema
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Desktop */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 3,
                alignItems: 'center'
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Logo" style={{ height: '40px' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: (theme) => theme.palette.primary.light, // Usa el color del título del tema
                  textDecoration: 'none',
                }}
              >
                QuickTrips
              </Typography>
            </Box>

            {/* Menú Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo Mobile */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center'
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Logo" style={{ height: '30px' }} />
            </Box>

            {/* Menú Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ 
                    my: 2, 
                    color: 'white', // Asegura que el texto sea blanco
                    display: 'block',
                    mx: 1,
                    fontWeight: 700, // Negritas
                    fontSize: '1.2rem', // Tamaño de texto más grande
                    textTransform: 'none', // Evita que el texto esté en mayúsculas
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.light, // Usa el color claro del tema
                    },
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Acciones */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/auth/login')}
                sx={{
                  color: (theme) => theme.palette.text.onmain, // Usa el color de texto principal del tema
                  borderColor: (theme) => theme.palette.text.onmain, // Usa el color de texto principal del tema
                  mr: 2,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.light, // Usa el color claro del tema
                    borderColor: (theme) => theme.palette.text.onmain
                  }
                }}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/auth/register')}
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main, // Usa el color secundario del tema
                  color: (theme) => theme.palette.text.primary, // Usa el color de texto principal del tema
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.main, // Usa el color secundario del tema
                    opacity: 0.9
                  }
                }}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
              >
                Registrarse
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}