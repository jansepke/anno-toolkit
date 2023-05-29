import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily, // this should not be necessary
  },
  palette: {
    primary: {
      main: "rgb(214, 180, 127)",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:last-child": {
            paddingBottom: theme.spacing(2),
          },
        }),
      },
    },
  },
});
