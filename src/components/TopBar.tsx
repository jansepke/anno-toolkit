import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { locales } from "../../i18n";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TopBar = ({ headline }: { headline: string }) => {
  const { asPath } = useRouter();
  const { lang } = useTranslation();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h4" className={classes.title}>
          {headline}
        </Typography>
        <div>
          <Button color="inherit" onClick={handleMenu}>
            {lang}
          </Button>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {locales.map((lng) => (
              <MenuItem key={lng} disabled={lng === lang}>
                <Link href={asPath} locale={lng}>
                  <Typography
                    variant="button"
                    display="block"
                    onClick={handleClose}
                  >
                    {lng}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Box display={{ xs: "none", sm: "block" }}>
          <Chip label="Anno Version 9.1" color="primary" />
          <IconButton
            color="inherit"
            href="https://github.com/jansepke/anno-toolkit"
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
