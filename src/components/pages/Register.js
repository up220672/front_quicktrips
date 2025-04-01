import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase) {
      return "La contraseña debe incluir al menos una letra mayúscula.";
    }
    if (!hasLowerCase) {
      return "La contraseña debe incluir al menos una letra minúscula.";
    }
    if (!hasNumber) {
      return "La contraseña debe incluir al menos un número.";
    }
    if (!hasSpecialChar) {
      return "La contraseña debe incluir al menos un carácter especial.";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://backend.quicktrips.lat/api/register", {
        username,
        email,
        password,
      });

      setSuccess("Cuenta creada exitosamente. Redirigiendo al inicio de sesión...");
      setTimeout(() => {
        navigate("/auth/login"); // Redirige al inicio de sesión
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (err) {
      setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Sección izquierda: Imagen */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(/image_2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      />

      {/* Sección derecha: Formulario */}
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Crear cuenta
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "gray", textAlign: "center" }}>
          Ingresa tus datos para registrarte.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2, width: "100%" }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2, width: "100%" }}>{success}</Alert>}
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1, width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Apodo"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar"}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                {"¿Ya tienes una cuenta? Inicia sesión aquí"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;