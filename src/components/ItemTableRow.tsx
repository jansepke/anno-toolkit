import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Image from "next/image";
import React from "react";
import { AnnoItem } from "../data/AnnoItem";

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
];

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

  if (upgrade.key === "ReplaceInputs") {
    return `${upgrade.key}: ${upgrade.value.Item.OldInput} -> ${upgrade.value.Item.NewInput}`;
  }

  return JSON.stringify(upgrade);
};

const ItemTableRow = ({ item }: { item: AnnoItem }) => {
  return (
    <TableRow hover={true}>
      <TableCell>
        <Image src={item.Icon} width={20} height={20} />
      </TableCell>
      <TableCell>{item.Name}</TableCell>
      <TableCell>{item.Type}</TableCell>
      <TableCell>{item.Rarity}</TableCell>
      <TableCell>{item.EffectTargets.join(", ")}</TableCell>
      <TableCell>
        {item.Upgrades.map((upgrade) => (
          <span key={upgrade.key}>
            {renderUpgrade(upgrade)}
            <br />
          </span>
        ))}
      </TableCell>
    </TableRow>
  );
};

export default ItemTableRow;
