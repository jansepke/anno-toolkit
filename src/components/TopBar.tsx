import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
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
          <IconButton color="inherit" size="large">
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
          <Chip label="Anno Version 12.0" color="primary" />
          <IconButton
            color="inherit"
            href="https://github.com/jansepke/anno-toolkit"
            target="_blank"
            rel="noopener"
            size="large"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
