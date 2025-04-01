import React, { forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  useTheme,
  Slide,
  styled
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  TaskAlt as TaskAltIcon,
  Cancel as CancelIcon,
  Help as HelpIcon,
  ThumbUp as ThumbUpIcon,
  Celebration as CelebrationIcon
} from '@mui/icons-material';

// Animación de entrada/salida
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Componente estilizado manteniendo el diseño original
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    transform: 'translateY(20px)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    maxWidth: '450px',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(145deg, #ffffff, #f8f9fa)'
      : 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    '&:hover': {
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
    }
  },
  '& .MuiDialog-container': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
}));

const GlowButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    bottom: '-50%',
    left: '-50%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))',
    transform: 'rotateZ(60deg) translate(-5em, 7.5em)',
    transition: 'all 0.5s ease'
  },
  '&:hover:after': {
    animation: '$shine 1.5s infinite'
  },
  '@keyframes shine': {
    '100%': {
      transform: 'rotateZ(60deg) translate(1em, -9em)'
    }
  }
}));

const DynamicNotification = ({
  isOpen = false,
  onClose = () => {}, // Para cerrar el diálogo
  onCancel = () => {}, // Acción específica del botón "Cancelar"
  onConfirm,
  title = "Notification",
  message = "",
  cancelText = "Cancelar",
  confirmText = "Aceptar",
  type = "info",
  icon,
  showCloseButton = true,
  showConfirmButton = true,
  showCancelButton = false,
}) => {
  const theme = useTheme();

  // Seleccionar icono basado en el tipo
  const getIconByType = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
return <TaskAltIcon />;
      case 'error':
return <ErrorIcon />;
      case 'warning':
return <WarningIcon />;
      case 'info':
return <InfoIcon />;
case 'email':
        return <EmailIcon />;
      case 'celebration':
        return <CelebrationIcon />;
      default:
return <InfoIcon />;
    }
  };

  // Estilos de icono basados en el tipo
  const getIconStyle = () => {
    switch (type) {
      case 'success': return { color: theme.palette.success.main };
      case 'error': return { color: theme.palette.error.main };
      case 'warning': return { color: theme.palette.warning.main };
      case 'info': return { color: theme.palette.info.main };
      default: return { color: theme.palette.primary.main };
    }
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose();
        }
      }}
      TransitionComponent={Transition}
      aria-labelledby="notification-dialog-title"
      aria-describedby="notification-dialog-description"
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          ...(isOpen && {
            opacity: 1,
            transform: 'translateY(0)'
          })
        }
      }}
    >
      <Box sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(90deg, #3f51b5, #2196f3)'
            : 'linear-gradient(90deg, #9c27b0, #3f51b5)',
          animation: '$progress 2.5s ease-in-out infinite',
          backgroundSize: '200% 200%'
        },
        '@keyframes progress': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }}>
        <DialogTitle sx={{
          display: 'flex',
          alignItems: 'center',
          py: 3,
          pr: 6,
          background: theme.palette.mode === 'light'
            ? 'rgba(255,255,255,0.7)'
            : 'rgba(30,30,30,0.7)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexGrow: 1
          }}>
            <Box sx={{
              p: 1.5,
              borderRadius: '50%',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #e3f2fd, #bbdefb)'
                : 'linear-gradient(135deg, #1a237e, #0d47a1)',
              color: getIconStyle().color,
              display: 'flex',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {React.cloneElement(getIconByType(), { fontSize: 'large' })}
            </Box>
            <Typography variant="h6" component="span" sx={{
              fontWeight: 600,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, #3f51b5, #2196f3)'
                : 'linear-gradient(90deg, #9c27b0, #3f51b5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {title}
            </Typography>
          </Box>
          {showCloseButton && (
            <IconButton 
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      </Box>

      <DialogContent sx={{
        py: 4,
        px: 3,
        background: theme.palette.mode === 'light'
          ? 'rgba(255,255,255,0.5)'
          : 'rgba(30,30,30,0.5)',
        backdropFilter: 'blur(8px)'
      }}>
        <Typography variant="body1" sx={{
          color: theme.palette.text.secondary,
          fontSize: '1.05rem',
          lineHeight: 1.6
        }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{
        px: 3,
        py: 2,
        background: theme.palette.mode === 'light'
          ? 'rgba(255,255,255,0.7)'
          : 'rgba(30,30,30,0.7)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        {showCancelButton && (
          <Button
            onClick={() => {
              onCancel(); // Ejecuta la acción específica del botón "Cancelar"
              onClose(); // Cierra el diálogo después
            }}
            variant="outlined"
            sx={{
              mr: 2,
              px: 3,
              py: 1,
              borderRadius: '8px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}
          >
            {cancelText}
          </Button>
        )}
        {showConfirmButton && onConfirm && (
          <GlowButton
            onClick={() => {
              onConfirm(); // Ejecuta la acción específica del botón "Confirmar"
            }}
            variant="contained"
            startIcon={<CheckCircleIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '8px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: "#FFFFFF",
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #3f51b5, #2196f3)'
                : 'linear-gradient(135deg, #9c27b0, #3f51b5)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            {confirmText}
          </GlowButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default DynamicNotification;