import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
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
