import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import { rarities } from "../anno-config";
import { AnnoItem } from "../data/AnnoItem";
import FavouriteButton from "./FavouriteButton";

const raritiesByKey = rarities.reduce(
  (all: any, r) => ({ ...all, [r.key]: r.color }),
  {}
);

const ItemCard = ({
  item,
  handleFavouriteChange,
  children,
}: {
  item: AnnoItem;
  handleFavouriteChange?: (itemId: number) => void;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  const textColor =
    item.rarity === "common"
      ? theme.palette.text.secondary
      : raritiesByKey[item.rarity];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ display: "flex" }}>
      <Card
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderWidth: 2,
          borderColor: raritiesByKey[item.rarity],
          borderStyle: "solid",
        }}
      >
        <CardHeader
          avatar={<Image src={item.icon} width={35} height={35} unoptimized />}
          title={
            <>
              <strong>{item.name}</strong>
              {handleFavouriteChange ? (
                <FavouriteButton
                  favourite={item.favourite || false}
                  handleFavouriteChange={() => handleFavouriteChange(item.id)}
                />
              ) : undefined}
            </>
          }
          titleTypographyProps={{ variant: "body1" }}
          subheader={
            <>
              <span style={{ color: textColor }}>{item.rarityLabel}&nbsp;</span>
              (ID: {item.id})
            </>
          }
        />
        <CardContent
          sx={{
            maxHeight: "12rem",
            overflow: "auto",
            paddingTop: "0",
            marginBottom: "auto",
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ItemCard;
