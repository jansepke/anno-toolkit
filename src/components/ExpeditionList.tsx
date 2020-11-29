import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import expeditionThreats from "../../data/anno/assets/expeditionthreat.json";
import { AnnoItem } from "../data/AnnoItem";
import ExpeditionAttributes from "./ExpeditionAttributes";
import ItemCard from "./ItemCard";
import TabBar from "./TabBar";

const useStyles = makeStyles((theme) => ({
  grayscale: {
    filter: "saturate(2) brightness(0.7)",
  },
}));

const ExpeditionList = ({ items }: { items: AnnoItem[] }) => {
  const classes = useStyles();
  const { t } = useTranslation("common");

  const tabs = expeditionThreats.map((threat) => ({
    key: threat.Values.Standard.Name.toLowerCase(),
    label: t("expeditionthreats." + threat.Values.Standard.Name.toLowerCase()),
    icon: `/img/${threat.Values.Standard.IconFilename.toLowerCase()
      .replace("data/ui/2kimages/", "")
      .replace(".png", "_0.png")}`,
  }));

  return (
    <Container maxWidth="xl">
      <TabBar
        type="scrollable"
        queryKey="threat"
        path="expedition"
        imageClassName={classes.grayscale}
        tabs={tabs}
      />
      <br />
      <Grid container spacing={3}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item}>
            <ExpeditionAttributes item={item} />
          </ItemCard>
        ))}
      </Grid>
    </Container>
  );
};

export default ExpeditionList;
