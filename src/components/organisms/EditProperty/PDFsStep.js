import React, { useState, useEffect } from 'react';
import { 
  Grid, Button, Typography, Box, 
  Card, CardContent, CardActions, Tooltip,
  LinearProgress
} from '@mui/material';
import { Delete, Visibility, Description, CloudUpload } from '@mui/icons-material';
import DynamicNotification from '../../atoms/NotificationAlert';
import axios from 'axios';
import Cookies from "js-cookie";

const PDFStep = ({ property, setProperty }) => {
  //const API_BASE = "http://localhost:3001";
  const API_BASE = "http://localhost:3001";
  const token = Cookies.get('token');
  const draftId = localStorage.getItem('property_draft');
  
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    severity: 'error'
  });

  const [uploadProgress, setUploadProgress] = useState({
    lup: 0,
    poa: 0,
    isUploading: false
  });

  // Obtener archivos actuales del draft
  const getCurrentFiles = () => {
    return {
      lup_pdf: property?.draft?.draft_data?.land_use_permit || null,
      poa_pdf: property?.draft?.draft_data?.proof_of_address || null
    };
  };

  const [currentFiles, setCurrentFiles] = useState(getCurrentFiles());

  // Actualizar cuando cambia el draft
  useEffect(() => {
    setCurrentFiles(getCurrentFiles());
  }, [property]);

  // Función para actualizar el draft
  const updateDraft = async (updatedData) => {
    if (!draftId) return;

    try {
      const response = await axios.put(
        `${API_BASE}/api/drafts/property/${draftId}`,
        { draft_data: updatedData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Actualizar el estado local con la respuesta
      if (response.data.draft) {
        setProperty(prev => ({
          ...prev,
          draft: response.data.draft
        }));
      }
    } catch (error) {
      console.error('Error al actualizar draft:', error);
      setNotification({
        isOpen: true,
        title: 'Error',
        message: 'No se pudo guardar los cambios',
        severity: 'error'
      });
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    if (file.type !== 'application/pdf') {
      setNotification({
        isOpen: true,
        title: 'Formato incorrecto',
        message: 'Solo se permiten archivos PDF',
        severity: 'error'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setNotification({
        isOpen: true,
        title: 'Archivo demasiado grande',
        message: 'El PDF no debe exceder los 10MB',
        severity: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress(prev => ({ ...prev, isUploading: true, [type]: 0 }));

      const response = await axios.post(`${API_BASE}/api/files/upload/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({ ...prev, [type]: percentCompleted }));
        }
      });

      const fileUrl = response.data.url;
      
      // Actualizar el draft con la nueva URL
      const updatedData = {
        ...property.draft.draft_data,
        [type === 'lup' ? 'land_use_permit' : 'proof_of_address']: fileUrl
      };

      await updateDraft(updatedData);

      setNotification({
        isOpen: true,
        title: 'Éxito',
        message: 'Archivo subido correctamente',
        severity: 'success'
      });

    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setNotification({
        isOpen: true,
        title: 'Error al subir el archivo',
        message: 'No se pudo subir el archivo. Inténtalo de nuevo.',
        severity: 'error'
      });
    } finally {
      setUploadProgress(prev => ({ ...prev, isUploading: false, [type]: 0 }));
    }
  };

  const handleDeleteFile = async (type) => {
    try {
        const fieldName = type === 'lup' ? 'land_use_permit' : 'proof_of_address';
        const updatedData = {
            ...property.draft.draft_data,
            [fieldName]: null
        };

        // Asegurarse de que la URL no tenga prefijo duplicado
        const filePath = currentFiles[`${type}_pdf`]?.replace(/^\/?pdfs\//, '/');
        console.log('filePath:', filePath);

        await axios.delete(`${API_BASE}/api/files/delete/pdf${filePath}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        await updateDraft(updatedData);

        setNotification({
            isOpen: true,
            title: 'Éxito',
            message: 'Archivo eliminado correctamente',
            severity: 'success'
        });

    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        setNotification({
            isOpen: true,
            title: 'Error',
            message: 'No se pudo eliminar el archivo',
            severity: 'error'
        });
    }
};

  const renderPDFCard = (type, label) => {
    const url = currentFiles[`${type}_pdf`];
    const isUploading = uploadProgress.isUploading && uploadProgress[type] > 0;
    const previewUrl = url ? `${API_BASE}${url}#view=fitH` : null;

    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Description sx={{ mr: 1, fontSize: 40, color: 'secondary.main' }} />
            <Typography variant="h6">{label}</Typography>
          </Box>
          
          {isUploading ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Subiendo archivo...</Typography>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress[type]} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" display="block" textAlign="right">
                {uploadProgress[type]}% completado
              </Typography>
            </Box>
          ) : url ? (
            <Box sx={{ mt: 2, height: 200, overflow: 'hidden', border: '1px solid #eee' }}>
              <iframe 
                src={previewUrl} 
                width="100%" 
                height="100%"
                style={{ border: 'none' }}
                title={`Vista previa ${label}`}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Documento actual
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No se ha subido ningún documento
            </Typography>
          )}
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          {url && !isUploading ? (
            <>
              <Tooltip title="Vista previa">
                <Button
                  size="small"
                  startIcon={<Visibility sx={{ color: 'secondary.main' }} />} 
                  onClick={() => window.open(previewUrl, '_blank')}
                >
                  Ver
                </Button>
              </Tooltip>
              
              <Button
                size="small"
                color="error"
                startIcon={<Delete sx={{ color: 'secondary.main' }} />}
                onClick={() => handleDeleteFile(type)}
              >
                Eliminar
              </Button>
            </>
          ) : !isUploading && (
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
              disabled={isUploading}
            >
              Subir PDF
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => handleFileUpload(e, type)}
              />
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <DynamicNotification
        isOpen={notification.isOpen}
        title={notification.title}
        message={notification.message}
        severity={notification.severity}
        showCancelButton={false}
        confirmText='Aceptar'
        onConfirm={() => setNotification(prev => ({ ...prev, isOpen: false }))}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2 30%, #4dabf5 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Documentos Requeridos
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {renderPDFCard('poa', 'Comprobante de Domicilio')}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {renderPDFCard('lup', 'Permiso de Uso de Suelo')}
        </Grid>
      </Grid>
    </>
  );
};

export default PDFStep;