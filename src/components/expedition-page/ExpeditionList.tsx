import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import { expeditionThreats } from "../../anno-config";
import { AnnoItem } from "../../data/AnnoItem";
import ItemCard from "../shared/ItemCard";
import TabBar from "../shared/TabBar";
import VirtualizedList from "../shared/VirtualizedList";
import ExpeditionAttributes from "./ExpeditionAttributes";

const ExpeditionList = ({ items }: { items: AnnoItem[] }) => {
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
        imageStyles={{ filter: "saturate(2) brightness(0.7)" }}
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

export default ExpeditionList;
