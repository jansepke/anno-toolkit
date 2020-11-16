import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";
import { Rarity } from "../data/data";

export interface FilterData {
  itemName: string;
  effectTarget: string;
  upgrade: string;
  rarity: string;
}

const Filters = ({
  items,
  rarities,
  filters,
  setFilters,
}: {
  items: AnnoItem[];
  rarities: Rarity[];
  filters: FilterData;
  setFilters: (filters: FilterData) => void;
}) => {
  const { t } = useTranslation();

  const effectTargets = items
    .flatMap((asset) => asset.effectTargets)
    .map((et) => et.label)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const upgrades = items
    .flatMap((asset) => asset.upgrades.map((upgrade) => upgrade.label))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const onItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, itemName: event.target.value });
  };

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
              <TextField
                label={t("common:itemName")}
                variant="outlined"
                value={filters.itemName}
                onChange={onItemNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <Autocomplete
                options={effectTargets}
                autoComplete={true}
                clearOnEscape={true}
                blurOnSelect={true}
                onChange={autocompleteChangeHandler("effectTarget")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("common:effectTarget")}
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
                blurOnSelect={true}
                onChange={autocompleteChangeHandler("upgrade")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("common:upgrades")}
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <Autocomplete
                options={rarities.map((r) => r.label)}
                autoComplete={true}
                blurOnSelect={true}
                onChange={autocompleteChangeHandler("rarity")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("common:rarity")}
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Filters;
