import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { expeditionThreats } from "../anno-config.json";
import { AnnoItem } from "../data/AnnoItem";

const ExpeditionAttributes = ({ item }: { item: AnnoItem }) => {
  const { t } = useTranslation("common");

  return (
    <Typography variant="body2" component="p">
      {item.expeditionAttributes
        .sort((a, b) => b.value - a.value)
        .map((attribute) => (
          <span key={attribute.key}>
            {t("expeditionThreats." + attribute.key)}
            {expeditionThreats.find((et) => et.key === attribute.key)?.icon
              ? ": " + attribute.value
              : ""}
            <br />
          </span>
        ))}
    </Typography>
  );
};

export default ExpeditionAttributes;
