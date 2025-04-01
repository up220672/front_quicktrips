import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';

// Coordenadas de Aguascalientes (centro de la ciudad)
const DEFAULT_CENTER = [21.8853, -102.2916]; // Latitud y longitud de Aguascalientes
const DEFAULT_ZOOM = 12; // Zoom más cercano para ver mejor la ciudad

// Fix para los iconos de marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapController = ({ position, setPosition }) => {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    } else {
      // Centrar en Aguascalientes si no hay posición definida
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    contextmenu(e) {
      setPosition(e.latlng);
    }
  });

  const toggleFullscreen = () => {
    const container = map.getContainer();
    if (!isFullscreen) {
      container.requestFullscreen?.().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
      }}
    >
      <Tooltip title="Pantalla completa">
        <IconButton onClick={toggleFullscreen} size="small">
          <Fullscreen />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const LocationMarker = ({ position }) => {
  return position ? <Marker position={position}></Marker> : null;
};

const LeafletMap = ({ position, setPosition }) => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
      closePopupOnClick={false}
      contextmenu={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker position={position} />
      <MapController 
        position={position} 
        setPosition={setPosition}
      />
    </MapContainer>
  );
};

export default LeafletMap;