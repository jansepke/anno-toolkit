import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";
import i18n from "../i18n";

export interface FilterData {
  effectTarget: string;
  upgrade: string;
  rarity: string;
}

const Filters = ({
  items,
  filteredItems,
  filters,
  setFilters,
}: {
  items: AnnoItem[];
  filteredItems: AnnoItem[];
  filters: FilterData;
  setFilters: (filters: FilterData) => void;
}) => {
  const [t] = i18n.useTranslation("common");

  const effectTargets = items
    .flatMap((asset) => asset.effectTargets)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const upgrades = items
    .flatMap((asset) => asset.upgrades.map((upgrade) => upgrade.label))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const raritySet = [
    t("Common"),
    t("Uncommon"),
    t("Rare"),
    t("Epic"),
    t("Legendary"),
  ];

  const autocompleteChangeHandler = (filter: string) => (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason
  ) => {
    reason === "clear" || value === ""
      ? setFilters({ ...filters, [filter]: "all" })
      : setFilters({ ...filters, [filter]: value });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <Autocomplete
                options={effectTargets}
                autoComplete={true}
                clearOnEscape={true}
                onChange={autocompleteChangeHandler("effectTarget")}
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
                onChange={autocompleteChangeHandler("upgrade")}
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
                onChange={autocompleteChangeHandler("rarity")}
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
              {filteredItems.length !== items.length
                ? `${filteredItems.length}/`
                : ""}
              {items.length} Items
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Filters;
