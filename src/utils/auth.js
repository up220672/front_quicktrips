import axios from "axios";
import Cookies from "js-cookie"; // Librería para manejar cookies
import {jwtDecode} from "jwt-decode"; // Librería para decodificar el token JWT

const API_BASE_URL = "http://localhost:3001/api";

// Verifica si el usuario está autenticado
export const isAuthenticated = async () => {
  const token = Cookies.get("token"); // Obtiene el token de las cookies

  if (!token) {
    return false; // No hay token, no está autenticado
  }

  try {
    // Verifica si el token de acceso es válido
    const response = await axios.post(`${API_BASE_URL}/verify-token`, {
      token,
      type: "access",
    });

    return response.status === 200; // Si el token es válido, retorna true
  } catch (error) {
    console.error("Token validation failed:", error.response?.data || error.message);

    // Si el token de acceso no es válido, intenta regenerarlo
    const refreshed = await refreshToken();
    return refreshed; // Retorna true si el token fue regenerado correctamente
  }
};

// Regenera el token de acceso usando el refresh token
export const refreshToken = async () => {
  const refreshToken = Cookies.get("refreshToken"); // Obtiene el refresh token de las cookies

  if (!refreshToken) {
    console.error("No refresh token found");
    return false; // No hay refresh token, no se puede regenerar
  }

  try {
    // Solicita un nuevo token de acceso
    const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
      token: refreshToken,
    });

    const { token, refreshToken: newRefreshToken } = response.data;

    // Guarda los nuevos tokens en cookies
    Cookies.set("token", token, { secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", newRefreshToken, { secure: true, sameSite: "Strict" });

    return true; // Token regenerado exitosamente
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout(); // Si falla, cierra la sesión
    return false;
  }
};

// Cierra la sesión del usuario
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  window.location.href = "/"; // Redirige al usuario a la página principal
};

// Obtiene un parámetro específico del usuario desde el backend
export const getUserParam = async (param) => {
  const user = await fetchUserInfo(); // Obtiene toda la información del usuario

  if (!user) {
    return null; // Retorna null si no se pudo obtener la información
  }

  return user[param]; // Retorna el valor del parámetro solicitado
};

export const isEmailConfirmed = async () => {
  const emailConfirmed = await getUserParam("email_verified");
  return emailConfirmed === true;
}

// Obtiene el ID del usuario desde el token
export const getUserIdFromToken = () => {
  const token = Cookies.get("token"); // Obtiene el token de las cookies

  if (!token) {
    console.error("No token found");
    return null; // Retorna null si no hay token
  }

  try {
    const decoded = jwtDecode(token); // Decodifica el token JWT
    return decoded.userId; // Retorna el ID del usuario
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Retorna null si ocurre un error
  }
};

// Obtiene la información del usuario por ID
export const fetchUserInfo = async () => {
  const userId = getUserIdFromToken(); // Obtiene el ID del usuario desde el token

  if (!userId) {
    console.error("No user ID found");
    return null; // Retorna null si no se pudo obtener el ID
  }

  try {
    // Solicita la información del usuario al backend
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`, // Envía el token en los headers
      },
    });

    return response.data; // Retorna la información del usuario
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    return null; // Retorna null si ocurre un error
  }
};