// src/components/Card.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActions, 
  List, 
  ListItem, 
  ListItemIcon, 
  Chip,
  Divider,
  useTheme,
  Box,
  Rating,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import {
  CheckCircle,
  Star,
  Favorite,
  Share,
  LocationOn,
  Wifi,
  AcUnit,
  Pool,
  Pets,
  LocalParking,
  Tv,
  Kitchen,
  Info,
  CalendarToday,
  Person,
  LocalFireDepartment,
  SmokeFree,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { 
  ContainedButton,
  OutlinedButton,
  LoadingButton
} from './Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';


export const StatsCard = ({ title, value, icon, color = 'primary', sx }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        backgroundColor: theme.palette[color].light,
        borderLeft: `4px solid ${theme.palette[color].main}`,
        overflow: 'hidden', // Evita que el contenido sobresalga
        ...sx,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette[color].main,
              color: theme.palette[color].contrastText,
              borderRadius: '50%', // Asegura que el botón sea circular
              width: theme.spacing(5), // Ajusta el tamaño del botón
              height: theme.spacing(5), // Ajusta el tamaño del botón
              overflow: 'hidden', // Evita que el contenido sobresalga
            }}
          >
            {icon}
          </Box>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" color="textPrimary">
              {value}
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export const MediaCard = ({ image, title, subtitle, content, actions, sx }) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6]
      },
      ...sx 
    }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectPosition: 'center top' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="secondary" mb={2}>
            {subtitle}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {actions && (
        <CardActions sx={{ justifyContent: 'space-between', padding: theme.spacing(2) }}>
          <OutlinedButton size="small" startIcon={<Share />}>
            Compartir
          </OutlinedButton>
          <ContainedButton color="secondary" endIcon={<ShoppingCart />}>
            Comprar
          </ContainedButton>
        </CardActions>
      )}
    </Card>
  );
};

export const ActionCard = ({ title, items, primaryAction, secondaryAction, sx }) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      border: `1px solid ${theme.palette.divider}`,
      ...sx 
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              {item}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', padding: theme.spacing(2) }}>
        <OutlinedButton onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </OutlinedButton>
        <ContainedButton 
          color="primary" 
          onClick={primaryAction.onClick}
          endIcon={<Favorite />}
        >
          {primaryAction.label}
        </ContainedButton>
      </CardActions>
    </Card>
  );
};

export const PricingCard = ({ 
  title, 
  price, 
  period, 
  features, 
  recommended = false,
  sx 
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      position: 'relative',
      overflow: 'visible',
      border: `2px solid ${recommended ? theme.palette.secondary.main : theme.palette.divider}`,
      ...sx 
    }}>
      {recommended && (
        <Chip
          label="Recomendado"
          color="secondary"
          sx={{ 
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      )}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box my={3}>
          <Typography variant="h2" color="primary">
            {price}
          </Typography>
          <Typography color="textSecondary">
            /{period}
          </Typography>
        </Box>
        <List dense>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ justifyContent: 'center' }}>
              <CheckCircle color="primary" sx={{ mr: 1 }} />
              {feature}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
        <ContainedButton fullWidth>
          Comenzar
        </ContainedButton>
      </CardActions>
    </Card>
  );
};

export const TestimonialCard = ({ 
  image, 
  name, 
  role, 
  text, 
  rating,
  sx 
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      backgroundColor: theme.palette.background.paper,
      ...sx 
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{ 
              width: 56, 
              height: 56, 
              borderRadius: '50%',
              mr: 2 
            }}
          />
          <div>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="body2" color="textSecondary">{role}</Typography>
          </div>
        </Box>
        <Typography variant="body1" paragraph>
          "{text}"
        </Typography>
        <Box display="flex" alignItems="center">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} color="secondary" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export const ComplexCard = ({ 
  header,
  title,
  subtitle,
  image,
  content,
  tags,
  actions,
  sx 
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...sx 
    }}>
      {header && (
        <Box
          sx={{
            p: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }}
        >
          <Typography variant="h6">{header}</Typography>
        </Box>
      )}
      
      {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        <Typography variant="body1" paragraph>
          {content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {tags?.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              color="secondary" 
            />
          ))}
        </Box>
      </CardContent>

      {actions && (
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton icon={<Info />} />
            <LoadingButton loadingPosition="start" startIcon={<Favorite />}>
              Guardar
            </LoadingButton>
            <ContainedButton variant="contained">
              Acción
            </ContainedButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

// Tarjeta básica de propiedad
export const PropertyCard = ({ image, title, location, price, rating, sx }) => {

  return (
    <Card sx={{ 
      transition: 'transform 0.3s', 
      '&:hover': { transform: 'translateY(-4px)' },
      ...sx 
    }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary">{price}/noche</Typography>
          <Box display="flex" alignItems="center">
            <Star color="secondary" />
            <Typography ml={1}>{rating}</Typography>
          </Box>
        </Box>
        <Typography variant="h6" mt={1}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOn fontSize="small" /> {location}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <IconButton><Favorite /></IconButton>
        <ContainedButton size="small">Reservar</ContainedButton>
      </CardActions>
    </Card>
  );
};


export const PropertyCardComponent = ({ property }) => {
  return (
    <Card sx={{ 
      transition: 'transform 0.3s', 
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={property.image}
        alt={property.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary">${property.price || 'N/A'}/noche</Typography>
          <Box display="flex" alignItems="center">
            <Star color="secondary" />
            <Typography ml={1}>{property.rating}</Typography>
          </Box>
        </Box>
        <Typography variant="h6" mt={1}>{property.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOn fontSize="small" /> {property.location || property.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <IconButton><Favorite /></IconButton>
        <Button variant="contained" size="small">Reservar</Button>
      </CardActions>
    </Card>
  );
};

// Tarjeta de amenities
export const AmenitiesCard = ({ amenities, sx }) => {
  const icons = {
    wifi: <Wifi />,
    pool: <Pool />,
    parking: <LocalParking />,
    ac: <AcUnit />,
    tv: <Tv />,
    kitchen: <Kitchen />,
    pets: <Pets />
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Amenidades
        </Typography>
        <Grid container spacing={2}>
          {amenities.map((amenity, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box display="flex" alignItems="center">
                {icons[amenity.type]}
                <Typography ml={1} variant="body2">{amenity.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Tarjeta de disponibilidad
export const AvailabilityCard = ({ sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Disponibilidad
        </Typography>
        <Box display="flex" alignItems="center">
          <CalendarToday color="action" />
          <Typography ml={1} variant="body2">Calendario interactivo</Typography>
        </Box>
        <Box mt={2}>
          <ContainedButton fullWidth>Ver fechas</ContainedButton>
        </Box>
      </CardContent>
    </Card>
  );
};

// Tarjeta de host
export const HostCard = ({ host, sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={host.photo} sx={{ width: 56, height: 56 }} />
          <Box ml={2}>
            <Typography variant="h6">Anfitrión: {host.name}</Typography>
            <Rating value={host.rating} readOnly />
          </Box>
        </Box>
        <OutlinedButton fullWidth startIcon={<Info />}>
          Ver perfil
        </OutlinedButton>
      </CardContent>
    </Card>
  );
};

// Tarjeta de precios detallados
export const PricingDetailCard = ({ priceDetails, sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Detalles de precios
        </Typography>
        <List>
          <ListItem>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography>Precio por noche</Typography>
              <Typography>{priceDetails.nightly}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography>Limpieza</Typography>
              <Typography>{priceDetails.cleaning}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography fontWeight="bold">{priceDetails.total}</Typography>
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

// Ejemplo de tarjeta de reglas de la casa
export const HouseRulesCard = ({ rules, sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Reglas de la casa
        </Typography>
        <List>
          {rules.map((rule, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {rule.icon === 'pets' ? <Pets /> : <SmokeFree />}
              </ListItemIcon>
              <Typography>{rule.text}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export const UserProfileCard = ({ user, sx }) => (
    <Card sx={sx}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Avatar src={user.avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography color="textSecondary" gutterBottom>{user.role}</Typography>
        <Rating value={user.rating} readOnly />
        <Box mt={2}>
          <ContainedButton fullWidth startIcon={<Person />}>
            Contactar
          </ContainedButton>
        </Box>
      </CardContent>
    </Card>
  );
  
  export const BookingCard = ({ price, sx }) => {    
    return (
      <Card sx={sx}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h5">Reservar ahora</Typography>
            <Chip label="Oferta especial" color="secondary" />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption">Check-in</Typography>
              <OutlinedButton fullWidth startIcon={<CalendarToday />}>
                Seleccionar
              </OutlinedButton>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Check-out</Typography>
              <OutlinedButton fullWidth startIcon={<CalendarToday />}>
                Seleccionar
              </OutlinedButton>
            </Grid>
          </Grid>
          <Box mt={3}>
            <ContainedButton fullWidth size="large">
              Reservar por ${price}
            </ContainedButton>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export const FeatureHighlightCard = ({ icon, title, description, sx }) => (
    <Card sx={{ textAlign: 'center', p: 3, ...sx }}>
      <Box sx={{ color: 'primary.main', fontSize: 40 }}>{icon}</Box>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2" color="textSecondary">{description}</Typography>
    </Card>
  );
  
  export const ComparisonCard = ({ items, sx }) => (
    <Card sx={sx}>
      <CardContent>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Typography variant="h6" gutterBottom>{item.title}</Typography>
              <List dense>
                {item.features.map((feature, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>{feature.icon}</ListItemIcon>
                    {feature.text}
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
  
  export const TimelineCard = ({ events, sx }) => (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Historial de la propiedad</Typography>
        {events.map((event, index) => (
          <Box key={index} sx={{ display: 'flex', mb: 2 }}>
            <Box sx={{ width: 40, mr: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>{event.year}</Avatar>
            </Box>
            <Box>
              <Typography variant="subtitle2">{event.title}</Typography>
              <Typography variant="body2" color="textSecondary">{event.description}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
  
  export const WeatherCard = ({ temperature, condition, sx }) => (
    <Card sx={sx}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {temperature}°C
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Clima actual
        </Typography>
        <Box sx={{ fontSize: 48, color: 'warning.main' }}>
          {condition === 'sunny' ? <LocalFireDepartment /> : <AcUnit />}
        </Box>
      </CardContent>
    </Card>
  );
  
  export const MapCard = ({ location, sx }) => (
    <Card sx={sx}>
      <CardMedia
        component="img"
        height="200"
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
        alt="Mapa"
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          Ubicación
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <LocationOn fontSize="small" /> {location}
        </Typography>
      </CardContent>
    </Card>
  );
  
  export const NeighborhoodCard = ({ amenities, sx }) => (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Zona y alrededores
        </Typography>
        <Grid container spacing={2}>
          {amenities.map((amenity, index) => (
            <Grid item xs={6} key={index}>
              <Box display="flex" alignItems="center">
                {amenity.icon}
                <Typography ml={1} variant="body2">{amenity.name}</Typography>
                <Typography ml={1} variant="caption" color="textSecondary">
                  ({amenity.distance})
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
  
  export const InvestmentCard = ({ metrics, sx }) => (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Análisis de inversión</Typography>
        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={6} key={index}>
              <Box borderLeft={4} borderColor="primary.main" pl={2}>
                <Typography variant="body2">{metric.label}</Typography>
                <Typography variant="h6">{metric.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );