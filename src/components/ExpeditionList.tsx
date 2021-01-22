import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { expeditionThreats } from "../anno-config.json";
import { AnnoItem } from "../data/AnnoItem";
import ExpeditionAttributes from "./ExpeditionAttributes";
import ItemCard from "./ItemCard";
import TabBar from "./TabBar";
import VirtualizedList from "./VirtualizedList";

const useStyles = makeStyles((theme) => ({
  grayscale: {
    filter: "saturate(2) brightness(0.7)",
  },
}));

const ExpeditionList = ({ items }: { items: AnnoItem[] }) => {
  const classes = useStyles();
  const { t } = useTranslation("common");

  const tabs = expeditionThreats
    .filter((threat) => threat.icon)
    .map((threat) => ({
      key: threat.key,
      label: t("expeditionThreats." + threat.key),
      icon: `/img/main/icons/${threat.icon}_0.png`,
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
      <Typography align="right">{items.length} Items</Typography>
      <br />
      <Grid container spacing={3}>
        <VirtualizedList
          items={items}
          renderItem={(item) => (
            <ItemCard key={item.id} item={item}>
              <ExpeditionAttributes item={item} />
            </ItemCard>
          )}
          loadingIndicator={(ref, visible) => (
            <Grid item xs={12} ref={ref}>
              <Grid container justify="center">
                {visible ? <CircularProgress /> : null}
              </Grid>
            </Grid>
          )}
        />
      </Grid>
    </Container>
  );
};

export default ExpeditionList;
