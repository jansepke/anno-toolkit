import { createTheme } from "@material-ui/core";

export default createTheme({
  palette: {
    primary: {
      main: "rgb(214, 180, 127)",
    },
  },
  overrides: {
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: -1,
        },
      },
    },
  },
});
