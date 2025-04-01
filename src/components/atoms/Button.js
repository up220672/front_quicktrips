import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Botones con color primario
export const TextButton = ({ children, onPress, href, disable = false, fontColor, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="text" 
      color={fontColor ? undefined : 'primary'}
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor || undefined,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

export const ContainedButton = ({ children, onPress, href, disable = false, fontColor = 'white', openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="contained" 
      color="primary"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

export const OutlinedButton = ({ children, onPress, href, disable = false, fontColor, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="outlined" 
      color={fontColor ? undefined : 'primary'}
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor || undefined,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

// Botones con color secundario
export const SecondaryTextButton = ({ children, onPress, href, disable = false, fontColor, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="text" 
      color="secondary"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor || undefined,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

export const SecondaryContainedButton = ({ children, onPress, href, disable = false, fontColor = 'white', openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="contained" 
      color="secondary"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

export const SecondaryOutlinedButton = ({ children, onPress, href, disable = false, fontColor, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="outlined" 
      color="secondary"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        color: fontColor || undefined,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

// Botones con color de éxito
export const SuccessContainedButton = ({ children, onPress, href, disable = false, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="contained" 
      color="success"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

// Botones con color de error
export const ErrorOutlinedButton = ({ children, onPress, href, disable = false, openInNewTab = true, size = 'small', startIcon, endIcon }) => {
  return (
    <Button 
      variant="outlined" 
      color="error"
      onClick={onPress || undefined}
      component={onPress ? 'button' : 'a'}
      href={!onPress && href ? href : undefined}
      target={!onPress && href && openInNewTab ? '_blank' : undefined}
      rel={!onPress && href && openInNewTab ? 'noopener noreferrer' : undefined}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
      disabled={disable}
    >
      {children}
    </Button>
  );
};

export const IconButton = ({ icon, onPress, disable = false, size = 40, color = 'primary', sx = {} }) => {
  return (
    <Button
      onClick={onPress || undefined}
      disabled={disable}
      sx={{
        minWidth: size,
        minHeight: size,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      color={color}
    >
      {icon}
    </Button>
  );
};

export const SvgButton = ({ svgIcon, href, onPress, disable = false, size = 40, color = 'primary', sx = {} }) => {
  return (
    <Button
      onClick={onPress || undefined}
      disabled={disable}
      href={href ? href : undefined}
      target={href ? '_self' : undefined} // Cambiado a '_self' para abrir en la misma pestaña
      rel={href ? 'noopener noreferrer' : undefined}
      sx={{
        minWidth: size,
        minHeight: size,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        ...sx,
      }}
    >
      <img
        src={svgIcon}
        alt="icon"
        style={{
          width: '70%',
          height: '70%',
        }}
      />
    </Button>
  );
};

export const LoadingButton = ({
    children,
    loading = false,
    loadingIndicator = <CircularProgress size={20} />,
    loadingPosition = 'start',
    startIcon,
    endIcon,
    sx = {},
    ...props
  }) => {
    const renderIcon = () => {
      if (!loading) {
        return loadingPosition === 'start' ? startIcon : endIcon;
      }
      return loadingPosition === 'start' ? loadingIndicator : null;
    };
  
    return (
      <Button
        {...props}
        startIcon={loadingPosition === 'start' ? renderIcon() : startIcon}
        endIcon={loadingPosition === 'end' ? renderIcon() : endIcon}
        disabled={loading || props.disabled}
        sx={{
          fontWeight: 'bold',
          textTransform: 'none',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
          },
          ...sx,
        }}
      >
        {loading && loadingPosition === 'end' ? loadingIndicator : children}
      </Button>
    );
  };