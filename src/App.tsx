import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { upgrades } from "./anno-config.json";
import Filters, { FilterData } from "./components/Filters";
import ItemCard from "./components/ItemCard";
import TabBar from "./components/TabBar";
import TopBar from "./components/TopBar";
import { AnnoItem, Upgrade } from "./data/AnnoItem";
import { PageData } from "./data/data";

const App = ({ data }: { data: PageData }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterData>({
    effectTarget: "all",
    upgrade: "all",
    rarity: "all",
    itemName: "",
  });

  // translate upgrades
  data.items.forEach((item) => {
    item.upgrades = item.upgrades.map((upgrade) => ({
      ...upgrade,
      label: t("common:upgradeTypes." + upgrade.key),
    }));
  });

  const filteredItems = data.items
    .filter(byItemName(filters.itemName))
    .filter(byEffectTarget(filters.effectTarget))
    .filter(byUpgrade(filters.upgrade))
    .filter(byRarity(filters.rarity));

  const effectTargetItems = data.items
    .filter(byItemName(filters.itemName))
    .filter(byUpgrade(filters.upgrade))
    .filter(byRarity(filters.rarity));

  const upgradeItems = data.items
    .filter(byItemName(filters.itemName))
    .filter(byEffectTarget(filters.effectTarget))
    .filter(byRarity(filters.rarity));

  const rarityItems = data.items
    .filter(byItemName(filters.itemName))
    .filter(byEffectTarget(filters.effectTarget))
    .filter(byUpgrade(filters.upgrade));

  return (
    <>
      <TopBar />

      <Container maxWidth="xl">
        <TabBar />
        <Filters
          effectTargetItems={effectTargetItems}
          upgradeItems={upgradeItems}
          rarityItems={rarityItems}
          filters={filters}
          setFilters={setFilters}
        />
        <br />
        <Typography align="right">
          {filteredItems.length !== data.items.length
            ? `${filteredItems.length}/`
            : ""}
          {data.items.length} Items
        </Typography>
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

function byItemName(filterValue: string) {
  return (item: AnnoItem) =>
    filterValue === "" ||
    item.name.toLowerCase().includes(filterValue.toLowerCase());
}

function byEffectTarget(filterValue: string) {
  return (item: AnnoItem) =>
    filterValue === "all" ||
    item.effectTargets.some((et) => et.label === filterValue);
}

function byUpgrade(filterValue: string) {
  const upgrade = upgrades.find((u) => u.key === filterValue);
  let additionalCheck = (u: Upgrade) => true;
  if (upgrade?.valueIs === "negative") {
    additionalCheck = (u) => getValue(u.value) < 0;
  }
  if (upgrade?.valueIs === "positive") {
    additionalCheck = (u) => getValue(u.value) > 0;
  }

  return (item: AnnoItem) =>
    filterValue === "all" ||
    item.upgrades.some((u) => u.key === filterValue && additionalCheck(u));
}

function byRarity(filterValue: string) {
  return (item: AnnoItem) =>
    filterValue === "all" || item.rarityLabel === filterValue;
}

function getValue(value: number | { Value: number }) {
  return typeof value === "number" ? value : value.Value;
}
