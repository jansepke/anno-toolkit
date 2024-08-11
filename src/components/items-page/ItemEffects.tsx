import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import { AnnoItem } from "../../data/AnnoItem";

const renderPercentage = [
  "ConstructionCostInPercent",
  "AttackSpeedUpgrade",
  "GenProbability",
  "TaxModifierInPercent",
  "WorkforceModifierInPercent",
  "ModuleLimitPercent",
];

const renderBoolean = ["BlockHostileTakeover", "BlockBuyShare", "HappinessIgnoresMorale", "ProvideIndustrialization"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderUpgradeItem = (key: string, item: any) => {
  switch (key) {
    case "ReplaceInputs":
      return `${item.OldInput_label} -> ${item.NewInput_label}`;
    case "AdditionalOutput":
      return `1/${item.AdditionalOutputCycle} ${item.Product_label ?? ""}`;
    case "InputAmountUpgrade":
      return item.Amount < 0 ? `${item.Amount} ${item.Product_label}` : undefined;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderUpgrade = (upgrade: any) => {
  if (upgrade.value.Value) {
    return `${upgrade.label}: ${upgrade.value.Value}${upgrade.value.Percental === 1 ? "%" : ""}`;
  }

  if (renderBoolean.includes(upgrade.key)) {
    return upgrade.label;
  }

  if (renderPercentage.includes(upgrade.key)) {
    return `${upgrade.label}: ${upgrade.value}%`;
  }

  if (upgrade.key === "DamageReceiveFactor") {
    return `${upgrade.label}: ${Math.round(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (1 - Object.values<any>(upgrade.value)[0].Factor) * 100,
    )}%`;
  }

  if (upgrade.key === "GenPool") {
    return `${upgrade.label}: ${upgrade.value.join(", ")}`;
  }

  if (typeof upgrade.value === "string" || typeof upgrade.value === "number") {
    return `${upgrade.label}: ${upgrade.value}`;
  }

  if (upgrade.value.Item) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upgrades = upgrade.value.Item.map((item: any) => renderUpgradeItem(upgrade.key, item)).filter(
      (upgrade?: string) => upgrade !== undefined,
    );

    return upgrades.length > 0 ? `${upgrade.label}: ${upgrades.join(", ")}` : undefined;
  }

  return JSON.stringify(upgrade);
};

interface ItemEffectProps {
  item: AnnoItem;
}

const ItemEffects: React.FC<ItemEffectProps> = ({ item }) => {
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
        {item.upgrades
          .map((upgrade) => {
            const result = renderUpgrade(upgrade);
            return result ? (
              <span key={upgrade.key}>
                {result}
                <br />
              </span>
            ) : undefined;
          })
          .filter((u) => u !== undefined)}
      </Typography>
    </>
  );
};

export default ItemEffects;
