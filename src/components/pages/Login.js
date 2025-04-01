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
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie"; // Importa la librería para manejar cookies

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      console.log(response.data);

      const { token, refreshToken } = response.data;

      // Guardar los tokens en cookies
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });

      // Redirigir al usuario a la página principal
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Sección izquierda: Formulario */}
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
          height: "100%", // Asegura que ocupe toda la altura disponible
          overflowY: "auto", // Permite desplazamiento vertical si el contenido es demasiado grande
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Iniciar sesión
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "gray", textAlign: "center" }}>
          Ingresa tus credenciales para acceder a tu cuenta.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2, width: "100%" }}>{error}</Alert>}
        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              borderRadius: "10px",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
          </Button>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link href="/auth/register" variant="body2">
                {"¿Aún no tienes una cuenta? Crea una aquí"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/reset-password" variant="body2">
                {"¿Olvidaste tu contraseña?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Sección derecha: Imagen */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(/image_1.jpg)", // Cambia esta URL por tu imagen
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%", // Asegura que ocupe toda la altura disponible
        }}
      />
    </Grid>
  );
};

export default LoginPage;