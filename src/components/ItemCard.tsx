import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "20vw",
  },
  content: {
    paddingTop: "0",
  },
}));

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

    default:
      return JSON.stringify(item);
  }
};

const renderUpgrade = (upgrade: any) => {
  if (upgrade.value.Value) {
    return `${upgrade.key}: ${upgrade.value.Value}${
      upgrade.value.Percental === 1 ? "%" : ""
    }`;
  }

  if (renderBoolean.includes(upgrade.key)) {
    return upgrade.key;
  }

  if (renderPercentage.includes(upgrade.key)) {
    return `${upgrade.key}: ${upgrade.value}%`;
  }

  if (upgrade.key === "DamageReceiveFactor") {
    return `${upgrade.key}: ${(1 - upgrade.value.Normal.Factor) * 100}%`;
  }

  if (typeof upgrade.value === "string" || typeof upgrade.value === "number") {
    return `${upgrade.key}: ${upgrade.value}`;
  }

  if (upgrade.value.Item) {
    return `${upgrade.key}: ${upgrade.value.Item.map((item: any) =>
      renderUpgradeItem(upgrade.key, item)
    ).join(", ")}`;
  }

  return JSON.stringify(upgrade);
};

const ItemCard = ({ item }: { item: AnnoItem }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card elevation={3} className={classes.card}>
        <CardHeader
          avatar={<Image src={item.icon} width={30} height={30} />}
          title={item.name}
          subheader={`${item.rarity} ${item.type}`}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" component="p" gutterBottom>
            Target: {item.effectTargets.join(", ")}
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
