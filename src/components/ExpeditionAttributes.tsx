import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import expeditionThreats from "../../data/anno/assets/expeditionthreat.json";
import { AnnoItem } from "../data/AnnoItem";

const ExpeditionAttributes = ({ item }: { item: AnnoItem }) => {
  const { t } = useTranslation("common");

  const threats = expeditionThreats.map((threat) =>
    threat.Values.Standard.Name.toLowerCase()
  );

  return (
    <Typography variant="body2" component="p">
      {item.expeditionAttributes
        .filter((attribute) => threats.includes(attribute.key))
        .map((attribute) => (
          <span key={attribute.key}>
            {t("expeditionthreats." + attribute.key)}: {attribute.value}
            <br />
          </span>
        ))}
    </Typography>
  );
};

export default ExpeditionAttributes;
