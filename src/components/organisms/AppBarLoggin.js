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
  Badge,
  MenuItem,
  ListItemIcon,
  Divider,
  useScrollTrigger,
  Slide,
  Tooltip,
  Avatar,
  Paper,
  ListItemText
} from '@mui/material';
import { 
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Favorite,
  Logout,
  Settings,
  Dashboard,
  Home,
  Explore,
  CardTravel,
  Brightness4,
  Palette
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';
import { fetchUserInfo, logout } from '../../utils/auth';

const pages = [
  { name: 'Inicio', path: '/', icon: <Home fontSize="small" /> },
  { name: 'Explorar', path: '/explorar', icon: <Explore fontSize="small" /> },
];

const settings = [
  { name: 'Perfil', path: '/perfil', icon: <AccountCircle fontSize="small" /> },
  { name: 'Dashboard', path: '/dashboard', icon: <Dashboard fontSize="small" /> },
  { name: 'Configuración', path: '/configuracion', icon: <Settings fontSize="small" /> },
  { name: 'Cerrar Sesión', action: logout, icon: <Logout fontSize="small" /> }
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const getFullImageUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `http://localhost:3001${path}`;
};

export default function AuthAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUser();
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
    handleCloseUserMenu();
  };

  const filteredSettings = settings.filter(setting => {
    if (setting.name === 'Dashboard'){
      return user?.role === 2; // Mostrar solo si el usuario tiene role igual a 2
    }
    return true; // Mostrar las demás opciones
  });

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: (theme) => theme.palette.primary.dark,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          py: 0.5,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: '70px' }}>
            {/* Logo Desktop */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 4,
                alignItems: 'center',
                cursor: 'pointer'
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Logo" style={{ height: '42px' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1.5,
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'white',
                  fontSize: '1.5rem'
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
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ mr: 1 }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    background: (theme) => theme.palette.primary.dark,
                    backdropFilter: 'blur(12px)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }
                }}
                MenuListProps={{
                  sx: { py: 0 }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={() => handleNavigate(page.path)}
                    sx={{
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        background: (theme) => theme.palette.primary.light
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                      {page.icon}
                    </ListItemIcon>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo Mobile */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Logo" style={{ height: '36px' }} />
            </Box>

            {/* Menú Desktop */}
            <Box sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              ml: 4,
              gap: 1
            }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ 
                    my: 2, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      background: (theme) => theme.palette.primary.light,
                    },
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.03 }}
                >
                  {page.icon}
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Menú Usuario */}
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <Tooltip title="Menú de usuario">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s'
                  }}
                >
                  <Avatar
                    src={user?.profile_picture ? getFullImageUrl(user.profile_picture) : undefined}
                    alt={user?.username || 'Usuario'}
                    sx={{ 
                      width: 44, 
                      height: 44,
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </IconButton>
              </Tooltip>
              
              <Menu
                sx={{ mt: '50px' }}
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    background: (theme) => theme.palette.primary.dark,
                    backdropFilter: 'blur(12px)',
                    borderRadius: '14px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'visible',
                    minWidth: '250px',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20,
                      width: 10,
                      height: 10,
                      bgcolor: (theme) => theme.palette.primary.dark,
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Paper 
                  sx={{ 
                    p: 2, 
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Avatar
                    src={user?.profile_picture ? getFullImageUrl(user.profile_picture) : undefined}
                    alt={user?.username || 'Usuario'}
                    sx={{ 
                      width: 48, 
                      height: 48,
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" color="white">
                      {user?.username || 'Usuario'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email || 'usuario@example.com'}
                    </Typography>
                  </Box>
                </Paper>
                
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 0.5 }} />
                
                {filteredSettings.map((setting) => (
                  <MenuItem 
                    key={setting.name} 
                    onClick={() => {
                      if (setting.action) {
                        setting.action();
                      } else {
                        handleNavigate(setting.path);
                      }
                      handleCloseUserMenu();
                    }}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      '&:hover': {
                        background: (theme) => theme.palette.primary.light
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                      {setting.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={setting.name} 
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 500,
                        color: 'white'
                      }}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}