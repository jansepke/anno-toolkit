import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import ItemCard from "./components/ItemCard";
import TabBar from "./components/TabBar";
import { PageData } from "./data/data";
import i18n from "./i18n";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const autocompleteChangeHandler = (setState: (value: string) => any) => (
  event: React.ChangeEvent<{}>,
  value: any,
  reason: AutocompleteChangeReason
) => {
  reason === "clear" || value === "" ? setState("all") : setState(value);
};

const App = ({ data }: { data: PageData }) => {
  const [t] = i18n.useTranslation("common");

  const effectTargets = data.items
    .flatMap((asset) => asset.effectTargets)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const [effectTarget, setEffectTarget] = useState("all");

  const upgrades = data.items
    .flatMap((asset) => asset.upgrades.map((upgrade) => upgrade.label))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const [upgrade, setUpgrade] = useState("all");

  const raritySet = [
    t("Common"),
    t("Uncommon"),
    t("Rare"),
    t("Epic"),
    t("Legendary"),
  ];

  const [rarity, setRarity] = useState("all");

  const filteredItems = data.items
    .filter(
      (item) =>
        effectTarget === "all" || item.effectTargets.includes(effectTarget)
    )
    .filter(
      (item) =>
        upgrade === "all" || item.upgrades.some((u) => u.label === upgrade)
    )
    .filter((item) => rarity === "all" || item.rarity === rarity);

  const classes = useStyles();

  return (
    <>
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

      <Container maxWidth="lg">
        <TabBar tabs={data.tabs} />
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth={true}>
                  <Autocomplete
                    options={effectTargets}
                    autoComplete={true}
                    clearOnEscape={true}
                    onChange={autocompleteChangeHandler(setEffectTarget)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("effectTarget")}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth={true}>
                  <Autocomplete
                    options={upgrades}
                    autoComplete={true}
                    clearOnEscape={true}
                    onChange={autocompleteChangeHandler(setUpgrade)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("upgrades")}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth={true}>
                  <Autocomplete
                    options={raritySet}
                    autoComplete={true}
                    onChange={autocompleteChangeHandler(setRarity)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("rarity")}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography align="right">
                  {filteredItems.length !== data.items.length
                    ? `${filteredItems.length}/`
                    : ""}
                  {data.items.length} Items
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
