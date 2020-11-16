import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
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
  const { t } = useTranslation();

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
        <TextField {...params} label={t(label)} variant="outlined" />
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
  const { t } = useTranslation();

  const onItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, itemName: event.target.value });
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
              <CustomAutocomplete
                label="common:effectTarget"
                items={effectTargetItems
                  .flatMap((asset) => asset.effectTargets)
                  .map((item) => item.label)
                  .sort()}
                onChange={(value) =>
                  setFilters({ ...filters, effectTarget: value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <CustomAutocomplete
                label="common:upgrades"
                items={upgradeItems
                  .flatMap((asset) => asset.upgrades)
                  .map((item) => item.label)
                  .sort()}
                onChange={(value) => setFilters({ ...filters, upgrade: value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <CustomAutocomplete
                label="common:rarity"
                items={rarityItems.map((asset) => asset.rarityLabel)}
                onChange={(value) => setFilters({ ...filters, rarity: value })}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Filters;
