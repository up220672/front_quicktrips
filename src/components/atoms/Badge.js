import React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

export const BasicBadge = ({ badgeContent, color = 'primary', children, onClick }) => (
  <Badge
    badgeContent={badgeContent}
    color={color}
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default', // Cambia el cursor si hay onClick
    }}
  >
    {children}
  </Badge>
);

export const DotBadge = ({ color = 'secondary', children, onClick }) => (
  <Badge
    color={color}
    variant="dot"
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default', // Cambia el cursor si hay onClick
    }}
  >
    {children}
  </Badge>
);

export const CustomBadge = ({ badgeContent, color = 'secondary', children, onClick }) => (
  <IconButton
    aria-label="cart"
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default', // Cambia el cursor si hay onClick
    }}
  >
    <Badge badgeContent={badgeContent} color={color}>
      {children}
    </Badge>
  </IconButton>
);

export const BadgeWithMax = ({ badgeContent, max = 99, color = 'secondary', children, onClick }) => (
  <Badge
    badgeContent={badgeContent}
    max={max}
    color={color}
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default', // Cambia el cursor si hay onClick
    }}
  >
    {children}
  </Badge>
);

export const BadgeWithAlignment = ({ badgeContent, color = 'secondary', anchorOrigin, children, onClick }) => (
  <Badge
    badgeContent={badgeContent}
    color={color}
    anchorOrigin={anchorOrigin}
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default', // Cambia el cursor si hay onClick
    }}
  >
    {children}
  </Badge>
);