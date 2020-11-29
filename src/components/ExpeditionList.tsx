import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import expeditionThreats from "../../data/anno/assets/expeditionthreat.json";
import TabBar from "./TabBar";

const ExpeditionList = ({ threat }: { threat: string }) => {
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
        tabs={tabs}
      />
      <Typography>{t("expeditionthreats." + threat)}</Typography>
    </Container>
  );
};

export default ExpeditionList;
