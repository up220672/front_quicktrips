import React, { useEffect, useState, useCallback } from 'react';
import { 
  Grid, Button, Typography, Box, 
  Card, CardMedia, IconButton, Tooltip,
  LinearProgress, CircularProgress
} from '@mui/material';
import { Delete, Visibility, CloudUpload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from "js-cookie";
import DynamicNotification from '../../atoms/NotificationAlert';

const PhotosVideosStep = ({ property, setProperty }) => {
  const API_BASE = "http://localhost:3001";
  const token = Cookies.get('token');
  const draftId = localStorage.getItem('property_draft');
  
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    severity: 'error'
  });

  const [uploadingMedia, setUploadingMedia] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // Normalizar los datos de fotos y videos para que tengan un formato consistente
  const normalizeMedia = (mediaArray, type) => {
    return mediaArray.map(item => ({
      id: item._id?.$oid || item.id || Math.random().toString(36).substr(2, 9),
      url: item.url,
      type: type,
    }));
  };

  // Obtener los datos actuales de fotos y videos normalizados
  const currentPhotos = normalizeMedia(property?.draft?.draft_data?.photos || [], 'image');
  const currentVideos = normalizeMedia(property?.draft?.draft_data?.videos || [], 'video');

  const updateDraft = useCallback(async (updatedPhotos, updatedVideos) => {
    if (!draftId) return;

    try {
      await axios.put(
        `${API_BASE}/api/drafts/property/${draftId}`,
        { 
          draft_data: {
            ...property.draft.draft_data,
            photos: updatedPhotos,
            videos: updatedVideos
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Multimedia actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar multimedia:', error);
    }
  }, [draftId, token, property.draft?.draft_data]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    e.target.value = '';

    for (const file of files) {
      const tempId = `temp_${Date.now()}`;
      const isImage = file.type.startsWith('image/');
      
      try {
        setUploadingMedia(prev => [...prev, { 
          id: tempId, 
          type: isImage ? 'image' : 'video',
          progress: 0 
        }]);

        // First API call - upload file to storage
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post(
          `${API_BASE}/api/files/upload/${isImage ? 'photo' : 'video'}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadingMedia(prev => 
                prev.map(m => m.id === tempId ? { ...m, progress } : m)
              );
            }
          }
        );

        // Second API call - update draft with media reference
        const mediaItem = {
          type: isImage ? 'image' : 'video',
          url: uploadResponse.data.url,
          fileName: uploadResponse.data.fileName
        };

        await axios.post(
          `${API_BASE}/api/drafts/${draftId}/upload-media`,
          mediaItem, 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        // Update local state with new media
        const newMediaItem = {
          id: uploadResponse.data.id || uploadResponse.data.url,
          url: `${uploadResponse.data.url}`,
          type: isImage ? 'image' : 'video'
        };

        // Actualización optimista del estado
        setProperty(prev => ({
          ...prev,
          draft: {
            ...prev.draft,
            draft_data: {
              ...prev.draft.draft_data,
              photos: isImage 
                ? [...(prev.draft.draft_data.photos || []), newMediaItem]
                : prev.draft.draft_data.photos,
              videos: !isImage
                ? [...(prev.draft.draft_data.videos || []), newMediaItem]
                : prev.draft.draft_data.videos
            }
          }
        }));

      } catch (error) {
        setNotification({
          isOpen: true,
          title: 'Error al subir',
          message: error.response?.data?.message || 'Error subiendo el archivo',
          severity: 'error'
        });
      } finally {
        setUploadingMedia(prev => prev.filter(m => m.id !== tempId));
      }
    }
  };

  const handleDeleteMedia = async (media) => {
    setDeletingId(media.id);
    
    try {
      const allMedia = [...currentPhotos, ...currentVideos];
      const mediaItem = allMedia.find(item => item.id === media.id);
      if (!mediaItem) return;

      // Extraer el nombre de archivo o URL base
      const fileUrl = mediaItem.url.replace(API_BASE, '');
      
      await axios.delete(
        `${API_BASE}/api/drafts/${draftId}/delete-media`,
        {
          data: {
            type: mediaItem.type,
            url: fileUrl
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Archivo eliminado:', media.id);
      console.log('allMedia:', allMedia);

      // Actualización optimista del estado
      setProperty(prev => {
        return {
          ...prev,
          draft: {
            ...prev.draft,
            draft_data: {
              ...prev.draft.draft_data,
              photos: prev.draft.draft_data.photos.filter(p => p.url !== media.url),
              videos: prev.draft.draft_data.videos.filter(v => v.url !== media.url)
            }
          }
        };
      });

    } catch (error) {
      setNotification({
        isOpen: true,
        title: 'Error al eliminar',
        message: error.response?.data?.message || 'No se pudo eliminar el archivo',
        severity: 'error'
      });
    } finally {
      setDeletingId(null);
    }
  };

  const renderMediaItem = (mediaItem) => {
    const isUploading = uploadingMedia.some(m => m.id === mediaItem.id);
    const uploadProgress = uploadingMedia.find(m => m.id === mediaItem.id)?.progress || 0;
    const isDeleting = deletingId === mediaItem.id;

    return (
      <Card sx={{ height: '100%', position: 'relative' }}>
        <Box sx={{ pt: '56.25%', position: 'relative' }}>
          {isUploading ? (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper'
            }}>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
                sx={{ width: '80%', height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {uploadProgress}% completado
              </Typography>
            </Box>
          ) : (
            <>
              {mediaItem.type === 'image' ? (
                <CardMedia
                  component="img"
                  image={mediaItem.url}
                  alt="Media preview"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <video
                  src={mediaItem.url}
                  controls
                  preload="metadata"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )}
            </>
          )}
        </Box>

        <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Vista previa">
            <IconButton onClick={() => window.open(`${API_BASE}${mediaItem.url}`, '_blank')}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar">
            <IconButton 
              onClick={() => handleDeleteMedia(mediaItem)}
              color="error"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <CircularProgress size={24} />
              ) : (
                <Delete fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    );
  };

  const allMedia = [...currentPhotos, ...currentVideos];
  const allMediaToDisplay = [...allMedia, ...uploadingMedia];

  return (
    <Box sx={{ p: 3 }}>
      <DynamicNotification
        isOpen={notification.isOpen}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
        {...notification}
      />

      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 600,
        mb: 3,
        background: 'linear-gradient(45deg, #1976d2 30%, #4dabf5 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Gestión Multimedia
      </Typography>

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        sx={{ mb: 3 }}
      >
        Subir archivos
        <input
          type="file"
          hidden
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
        />
      </Button>

      <Grid container spacing={3}>
        {allMediaToDisplay.map((mediaItem) => (
          <Grid item xs={12} sm={6} md={4} key={mediaItem.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderMediaItem(mediaItem)}
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {allMedia.length === 0 && uploadingMedia.length === 0 && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1
        }}>
          <CloudUpload sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No hay archivos multimedia
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PhotosVideosStep;