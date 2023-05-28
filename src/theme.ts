import { Theme, createTheme } from "@mui/material/styles";
import "@mui/styles";

declare module "@mui/styles" {
  interface DefaultTheme extends Theme {}
}

export default createTheme({
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
