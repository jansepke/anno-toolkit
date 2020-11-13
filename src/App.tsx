import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import Filters, { FilterData } from "./components/Filters";
import ItemCard from "./components/ItemCard";
import TabBar from "./components/TabBar";
import TopBar from "./components/TopBar";
import { PageData } from "./data/data";

const App = ({ data }: { data: PageData }) => {
  const [filters, setFilters] = useState<FilterData>({
    effectTarget: "all",
    upgrade: "all",
    rarity: "all",
    itemName: "",
  });

  const filteredItems = data.items
    .filter(
      (item) =>
        filters.itemName === "" ||
        item.name.toLowerCase().includes(filters.itemName.toLowerCase())
    )
    .filter(
      (item) =>
        filters.effectTarget === "all" ||
        item.effectTargets.some((et) => et.label === filters.effectTarget)
    )
    .filter(
      (item) =>
        filters.upgrade === "all" ||
        item.upgrades.some((u) => u.label === filters.upgrade)
    )
    .filter(
      (item) => filters.rarity === "all" || item.rarityLabel === filters.rarity
    );

  return (
    <>
      <TopBar />

      <Container maxWidth="xl">
        <TabBar tabs={data.tabs} />
        <Filters
          items={data.items}
          rarities={data.rarities}
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
