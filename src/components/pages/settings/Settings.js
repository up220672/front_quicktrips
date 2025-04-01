import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  useMediaQuery,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  AccountCircle, 
  Notifications, 
  Security, 
  Palette,
  ExitToApp 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ProfileSection from './ProfileSection';
import AppearanceSection from './AppearanceSection';
import NotificationsSection from './NotificationsSection';
import SecuritySection from './SecuritySection';
import { logout } from '../../../utils/auth';

const SettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulando carga de datos del usuario
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setUserData({
        username: 'daniel',
        profile_picture: null,
        first_name: null,
        last_name: null,
        description_markdown: null,
        phone: null,
        date_of_birth: null,
        language: 'es',
        address: null,
        currency: 'USD'
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'profile', text: 'Perfil', icon: <AccountCircle /> },
    //{ id: 'appearance', text: 'Apariencia', icon: <Palette /> },
    //{ id: 'notifications', text: 'Notificaciones', icon: <Notifications /> },
    //{ id: 'security', text: 'Seguridad', icon: <Security /> },
    { id: 'logout', text: 'Cerrar sesión', icon: <ExitToApp />, action: logout, color: 'error' }
  ];

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveSection(item.id);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 800,
          mb: 4,
          color: theme.palette.text.primary,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}
      >
        Configuración
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 4,
        mt: 2
      }}>
        {/* Menú lateral */}
        <Paper 
          elevation={2} 
          sx={{ 
            width: isMobile ? '100%' : 280,
            flexShrink: 0,
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <List disablePadding>
            {menuItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  button
                  selected={activeSection === item.id}
                  onClick={() => handleMenuClick(item)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.action.selected,
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected
                      }
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    },
                    py: 2,
                    px: 3,
                    transition: 'all 0.2s ease',
                    color: item.color ? theme.palette[item.color].main : 'inherit'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontWeight: 500 }} 
                  />
                </ListItem>
                {item.id === 'security' && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Paper
              elevation={2}
              sx={{
                borderRadius: 3,
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper
              }}
            >
              {activeSection === 'profile' && <ProfileSection />}
              {activeSection === 'appearance' && <AppearanceSection />}
              {activeSection === 'notifications' && <NotificationsSection />}
              {activeSection === 'security' && <SecuritySection />}
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};


export default SettingsPage;