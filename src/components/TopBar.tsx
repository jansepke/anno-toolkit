import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { locales } from "../../i18n.json";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TopBar = () => {
  const { asPath } = useRouter();
  const { t, lang } = useTranslation();
  const classes = useStyles();

  const otherLocales = locales.filter((l) => l !== lang);
  const path = asPath === "/" ? "/harboroffice" : asPath;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          {t("common:title")}
        </Typography>
        <div>
          {otherLocales.map((lng) => (
            <Link href={path} locale={lng} key={lng}>
              <Button color="inherit">{lng}</Button>
            </Link>
          ))}
        </div>
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
