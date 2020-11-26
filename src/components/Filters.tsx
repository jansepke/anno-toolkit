import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";

export interface FilterData {
  itemName: string;
  effectTarget: string;
  upgrade: string;
  rarity: string;
  onlyFavourites: boolean;
}

const CustomAutocomplete = ({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (value: string) => void;
}) => {
  const options = items.filter((v, i, a) => a.indexOf(v) === i);

  return (
    <Autocomplete
      options={options}
      autoComplete={true}
      clearOnEscape={true}
      blurOnSelect={true}
      onChange={(event, value, reason) => {
        reason === "clear" || value === "" || value === null
          ? onChange("all")
          : onChange(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

const Filters = ({
  effectTargetItems,
  upgradeItems,
  rarityItems,
  filters,
  setFilters,
}: {
  effectTargetItems: AnnoItem[];
  upgradeItems: AnnoItem[];
  rarityItems: AnnoItem[];
  filters: FilterData;
  setFilters: (filters: FilterData) => void;
}) => {
  const { t } = useTranslation("common");

  const onItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, itemName: event.target.value });
  };

  const effectTargetOptions = effectTargetItems
    .flatMap((asset) => asset.effectTargets)
    .map((item) => item.label)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const upgradeOptions = upgradeItems
    .flatMap((asset) => asset.upgrades)
    .filter(
      (upgrade, index, self) =>
        self.findIndex((u) => u.key === upgrade.key) === index
    )
    .sort((a, b) => (a?.label as string).localeCompare(b?.label as string));
  const rarityOptions = rarityItems
    .map((asset) => asset.rarityLabel)
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <TextField
                label={t("filter.itemName")}
                variant="outlined"
                value={filters.itemName}
                onChange={onItemNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <CustomAutocomplete
                label={t("filter.effectTarget")}
                items={effectTargetOptions}
                onChange={(value) =>
                  setFilters({ ...filters, effectTarget: value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <Autocomplete
                options={upgradeOptions}
                getOptionLabel={(option) => option.label as string}
                getOptionSelected={(a, b) => a.key === b.key}
                autoComplete={true}
                clearOnEscape={true}
                blurOnSelect={true}
                onChange={(event, value, reason) => {
                  reason === "clear" || value === null
                    ? setFilters({ ...filters, upgrade: "all" })
                    : setFilters({ ...filters, upgrade: value.key });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("filter.upgrades")}
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <CustomAutocomplete
                label={t("filter.rarity")}
                items={rarityOptions}
                onChange={(value) => setFilters({ ...filters, rarity: value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              label={t("filter.onlyFavourites")}
              control={
                <Switch
                  size="medium"
                  color="primary"
                  checked={filters.onlyFavourites}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      onlyFavourites: !filters.onlyFavourites,
                    })
                  }
                />
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Filters;
