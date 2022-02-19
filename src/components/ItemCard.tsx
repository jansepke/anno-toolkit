import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import React from "react";
import { rarities } from "../anno-config";
import { AnnoItem } from "../data/AnnoItem";
import FavouriteButton from "./FavouriteButton";

const useStyles: (props?: any) => Record<string, string> = makeStyles(
  (theme) => ({
    gridItem: {
      display: "flex",
    },
    card: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      borderWidth: 2,
      borderStyle: "solid",
    },
    content: {
      maxHeight: "12rem",
      overflow: "auto",
      paddingTop: "0",
      marginBottom: "auto",
    },
    ...rarities.reduce(
      (all, r, i) => ({
        ...all,
        [r.key + "Card"]: { borderColor: r.color },
        [r.key + "Text"]: {
          color: i === 0 ? theme.palette.text.secondary : r.color,
        },
      }),
      {}
    ),
  })
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
  const classes = useStyles();
  const cardClasses = [classes.card, classes[item.rarity + "Card"]];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.gridItem}>
      <Card elevation={3} className={cardClasses.join(" ")}>
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
              <span className={classes[item.rarity + "Text"]}>
                {item.rarityLabel}&nbsp;
              </span>
              (ID: {item.id})
            </>
          }
        />
        <CardContent className={classes.content}>{children}</CardContent>
      </Card>
    </Grid>
  );
};

export default ItemCard;
