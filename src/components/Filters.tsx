import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

interface CustomAutocompleteProps {
  label: string;
  items: {
    label: string;
  }[];
  onChange: (value: string) => void;
}

const CustomAutocomplete = ({
  label,
  items,
  onChange,
}: CustomAutocompleteProps) => {
  const { t } = useTranslation();

  const options = items
    .map((item) => item.label)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

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
                items={items.flatMap((asset) => asset.effectTargets)}
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
                items={items.flatMap((asset) => asset.upgrades)}
                onChange={(value) => setFilters({ ...filters, upgrade: value })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth={true}>
              <CustomAutocomplete
                label="common:rarity"
                items={rarities}
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
