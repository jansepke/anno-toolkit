import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import Filters from "./components/Filters";
import ItemCard from "./components/ItemCard";
import TabBar from "./components/TabBar";
import TopBar from "./components/TopBar";
import { PageData } from "./data/data";

const App = ({ data }: { data: PageData }) => {
  const [filters, setFilters] = useState({
    effectTarget: "all",
    upgrade: "all",
    rarity: "all",
  });

  const filteredItems = data.items
    .filter(
      (item) =>
        filters.effectTarget === "all" ||
        item.effectTargets.includes(filters.effectTarget)
    )
    .filter(
      (item) =>
        filters.upgrade === "all" ||
        item.upgrades.some((u) => u.label === filters.upgrade)
    )
    .filter(
      (item) => filters.rarity === "all" || item.rarity === filters.rarity
    );

  return (
    <>
      <TopBar />

      <Container maxWidth="xl">
        <TabBar tabs={data.tabs} />
        <Filters
          items={data.items}
          filteredItems={filteredItems}
          filters={filters}
          setFilters={setFilters}
        />
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
