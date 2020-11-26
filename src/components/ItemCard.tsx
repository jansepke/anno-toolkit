import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React from "react";
import { rarities } from "../anno-config.json";
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

const renderPercentage = [
  "ConstructionCostInPercent",
  "AttackSpeedUpgrade",
  "GenProbability",
  "TaxModifierInPercent",
  "WorkforceModifierInPercent",
  "ModuleLimitPercent",
];

const renderBoolean = [
  "BlockHostileTakeover",
  "BlockBuyShare",
  "HappinessIgnoresMorale",
  "ProvideIndustrialization",
];

const renderUpgradeItem = (key: string, item: any) => {
  switch (key) {
    case "ReplaceInputs":
      return `${item.OldInput} -> ${item.NewInput}`;
    case "AdditionalOutput":
      return `1/${item.AdditionalOutputCycle} ${item.Product}`;
    case "InputAmountUpgrade":
      return `${item.Amount} ${item.Product}`;
    case "AddAssemblyOptions":
      return item.NewOption;
    case "InputBenefitModifier":
      if (item.AdditionalMoney) {
        return `${item.Product} +${item.AdditionalMoney} Money`;
      } else if (item.AdditionalSupply) {
        return `${item.Product} +${item.AdditionalSupply} Supply`;
      } else {
        return `${item.Product} +${item.AdditionalHappiness} Happiness`;
      }
    case "NeedProvideNeedUpgrade":
      return `${item.SubstituteNeed} -> ${item.ProvidedNeed}`;
    case "GoodConsumptionUpgrade":
      return `${item.AmountInPercent}% ${item.ProvidedNeed}`;

    default:
      return JSON.stringify(item);
  }
};

const renderUpgrade = (upgrade: any) => {
  if (upgrade.value.Value) {
    return `${upgrade.label}: ${upgrade.value.Value}${
      upgrade.value.Percental === 1 ? "%" : ""
    }`;
  }

  if (renderBoolean.includes(upgrade.key)) {
    return upgrade.label;
  }

  if (renderPercentage.includes(upgrade.key)) {
    return `${upgrade.label}: ${upgrade.value}%`;
  }

  if (upgrade.key === "DamageReceiveFactor") {
    return `${upgrade.label}: ${Math.round(
      (1 - Object.values<any>(upgrade.value)[0].Factor) * 100
    )}%`;
  }

  if (upgrade.key === "GenPool") {
    return `${upgrade.label}: ${upgrade.value.join(", ")}`;
  }

  if (typeof upgrade.value === "string" || typeof upgrade.value === "number") {
    return `${upgrade.label}: ${upgrade.value}`;
  }

  if (upgrade.value.Item) {
    return `${upgrade.label}: ${upgrade.value.Item.map((item: any) =>
      renderUpgradeItem(upgrade.key, item)
    ).join(", ")}`;
  }

  return JSON.stringify(upgrade);
};

const ItemCard = ({
  item,
  handleFavouriteChange,
}: {
  item: AnnoItem;
  handleFavouriteChange: (itemId: number) => void;
}) => {
  const classes = useStyles();
  const { t } = useTranslation("common");
  const cardClasses = [classes.card, classes[item.rarity + "Card"]];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.gridItem}>
      <Card elevation={3} className={cardClasses.join(" ")}>
        <CardHeader
          avatar={<Image src={item.icon} width={35} height={35} />}
          title={
            <>
              <strong>{item.name}</strong>
              <FavouriteButton
                favourite={item.favourite || false}
                handleFavouriteChange={() => handleFavouriteChange(item.id)}
              />
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
        <CardContent className={classes.content}>
          <Typography variant="body2" component="p" gutterBottom>
            <strong>{t("target")}: </strong>
            {item.effectTargets
              .filter((et) => et.visible)
              .map((et) => et.label)
              .join(", ")}
          </Typography>
          <Typography variant="body2" component="p">
            {item.upgrades.map((upgrade) => (
              <span key={upgrade.key}>
                {renderUpgrade(upgrade)}
                <br />
              </span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ItemCard;
