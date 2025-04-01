import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#81BFDA",
      //dark: "#408eb0", // Mueve primaryDark aquí
      dark: "#81BFDA", // Mueve primaryDark aquí
      light: "#c8e3ef", // Mueve primaryLight aquí
      contrastText: "#FFFFFF", // Asegura que el texto sea blanco
    },
    secondary: {
      main: "#FADA7A",
    },
    success: {
      main: "#A9C46C",
    },
    error: {
      main: "#EB5A3C",
    },
    text: {
      primary: "#333333",
      onmain: "#FFFFFF", // Usa TextPrimary aquí
      secondary: "#2a7393", // Usa TextTitle aquí
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: {
      fontWeight: 700, // Aplica negritas a los textos de los botones
      textTransform: "none", // Evita que los textos estén en mayúsculas
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //color: "#FFFFFF", // Texto blanco para todos los botones
          fontWeight: 700, // Negritas en los textos de los botones
          textTransform: "none", // Evita que los textos estén en mayúsculas
        },
      },
    },
  },
});

export default theme;