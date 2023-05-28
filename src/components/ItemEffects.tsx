import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
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
  "ProvideIndustrialization",
];

const renderUpgradeItem = (key: string, item: any) => {
  switch (key) {
    case "ReplaceInputs":
      return `${item.OldInput_label} -> ${item.NewInput_label}`;
    case "AdditionalOutput":
      return `1/${item.AdditionalOutputCycle} ${item.Product_label}`;
    case "InputAmountUpgrade":
      return `${item.Amount} ${item.Product_label}`;
    case "AddAssemblyOptions":
      return item.NewOption_label;
    case "InputBenefitModifier":
      if (item.AdditionalMoney) {
        return `${item.Product_label} +${item.AdditionalMoney} Money`;
      } else if (item.AdditionalSupply) {
        return `${item.Product_label} +${item.AdditionalSupply} Supply`;
      } else {
        return `${item.Product_label} +${item.AdditionalHappiness} Happiness`;
      }
    case "NeedProvideNeedUpgrade":
      return `${item.SubstituteNeed_label} -> ${item.ProvidedNeed_label}`;
    case "GoodConsumptionUpgrade":
      return `${item.AmountInPercent}% ${item.ProvidedNeed_label}`;

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

const ItemEffects = ({ item }: { item: AnnoItem }) => {
  const { t } = useTranslation("common");

  return (
    <>
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
    </>
  );
};

export default ItemEffects;
