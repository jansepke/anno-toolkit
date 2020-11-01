import AppBar from "@material-ui/core/AppBar";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";
import i18n from "../i18n";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TopBar = () => {
  const [t] = i18n.useTranslation("common");
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          {t("title")}
        </Typography>
        <Chip label="Anno Version 9.0" color="primary" />
        <IconButton
          color="inherit"
          href="https://github.com/jansepke/anno1800-items"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
