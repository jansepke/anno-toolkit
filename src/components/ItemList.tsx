import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { itemTypes } from "../anno-config";
import { AnnoItem } from "../data/AnnoItem";
import {
  byEffectTarget,
  byFavourite,
  byItemName,
  byItemWorld,
  byRarity,
  byUpgrade,
} from "../util/filters";
import { useStateWithLocalStorage } from "../util/hooks";
import Filters, { FilterData } from "./Filters";
import ItemCard from "./ItemCard";
import ItemEffects from "./ItemEffects";
import TabBar from "./TabBar";
import VirtualizedList from "./VirtualizedList";

const ItemList = ({ items }: { items: AnnoItem[] }) => {
  const { t } = useTranslation("common");
  const [filters, setFilters] = useState<FilterData>({
    effectTarget: "all",
    upgrade: "all",
    rarity: "all",
    itemName: "",
    itemWorld: "all",
    onlyFavourites: false,
  });
  const [favourites, setFavourites] = useStateWithLocalStorage<number[]>(
    "items.favourites",
    []
  );

  const handleFavouriteChange = (itemId: number) => {
    setFavourites(
      favourites.includes(itemId)
        ? favourites.filter((f) => f !== itemId)
        : [...favourites, itemId]
    );
  };

  items.forEach((item) => {
    // set favourite status
    item.favourite = favourites.includes(item.id);
    // translate upgrades
    item.upgrades = item.upgrades.map((upgrade) => ({
      ...upgrade,
      label: t("upgrades." + upgrade.key),
    }));
  });

  const filteredItems = items
    .filter(byItemName(filters.itemName))
    .filter(byEffectTarget(filters.effectTarget))
    .filter(byUpgrade(filters.upgrade))
    .filter(byRarity(filters.rarity))
    .filter(byFavourite(filters.onlyFavourites))
    .filter(byItemWorld(filters.itemWorld));

  const tabs = itemTypes
    .filter((itemType) => !itemType.hidden)
    .map((itemType) => ({
      key: itemType.key,
      label: t("itemTypes." + itemType.key),
      icon: `/img/main/3dicons/${itemType.icon}.png`,
    }));

  return (
    <Container maxWidth="xl">
      <TabBar type="centered" queryKey="itemType" path="items" tabs={tabs} />
      <Filters items={items} filters={filters} setFilters={setFilters} />
      <br />
      <Typography align="right">
        {filteredItems.length !== items.length
          ? `${filteredItems.length}/`
          : ""}
        {items.length} Items
      </Typography>
      <br />
      <Grid container spacing={3}>
        <VirtualizedList
          items={filteredItems}
          renderItem={(item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleFavouriteChange={handleFavouriteChange}
            >
              <ItemEffects item={item} />
            </ItemCard>
          )}
          loadingIndicator={(ref, visible) => (
            <Grid item xs={12} ref={ref}>
              <Grid container justifyContent="center">
                {visible ? <CircularProgress /> : null}
              </Grid>
            </Grid>
          )}
        />
      </Grid>
    </Container>
  );
};

export default ItemList;
