import { rewardPoolIDs } from "./assets";
import { translations } from "./translations";

export interface AnnoItem {
  id: number;
  name: string;
  icon: string;
  type: string;
  rarity: string;
  effectTargets: string[];
  // TODO: ItemAction
  // TODO: ExpeditionAttribute
  upgrades: { key: string; label: string; value: any }[];
}

export async function newAnnoItem(asset: any): Promise<AnnoItem> {
  const values = asset.Values;

  const iconPath = values.Standard.IconFilename.replace(
    "data/ui/2kimages/",
    "/img/"
  ).replace(".png", "_0.png");

  return {
    id: values.Standard.GUID,
    name: translations[values.Standard.GUID],
    icon: iconPath,
    effectTargets: resolveEffectTarget(values),
    type: values.Item.ItemType || "",
    rarity:
      translations[rarityIds[values.Item.Rarity]] ||
      translations[rarityIds["Common"]],
    upgrades: getUpgrades(values),
  };
}

function resolveEffectTarget(values: any) {
  let effectTargets = values.ItemEffect.EffectTargets.Item;

  if (!Array.isArray(effectTargets)) {
    effectTargets = [effectTargets];
  }

  return effectTargets
    .map((target: any) => translations[target.GUID])
    .filter((target: any) => target);
}

function getUpgrades(values: any) {
  return Object.entries(values)
    .filter(([key, value]) => key.includes("Upgrade") && value !== "")
    .flatMap(([upgradeGroup, value]: any[]) =>
      Object.entries(value).map(([upgradeKey, v]: [string, any]) => ({
        key: upgradeKey,
        label: translations[upgradeIds[upgradeKey]] || upgradeKey,
        value: translateValue(upgradeKey, v),
      }))
    )
    .filter((upgrade) => upgrade.key !== "PublicServiceNoSatisfactionDistance");
}

function translateValue(upgradeKey: string, value: any): any {
  if (upgradeKey === "GenPool") {
    const genPool = rewardPoolIDs[value];
    if (!genPool) {
      return [value];
    }
    let products = genPool.Values.RewardPool.ItemsPool.Item;
    if (!Array.isArray(products)) {
      products = [products];
    }

    return products.map((p: any) => translations[p.ItemLink]);
  }

  if (typeof value === "number" && value >= 10000 && translations[value]) {
    return translations[value];
  }

  if (
    typeof value === "object" &&
    typeof value.Item === "object" &&
    !Array.isArray(value.Item)
  ) {
    value.Item = [value.Item];
  }

  if (typeof value === "object" && Array.isArray(value.Item)) {
    for (const item of value.Item) {
      for (const property in item) {
        const value = item[property];

        if (
          typeof value === "number" &&
          value >= 10000 &&
          translations[value]
        ) {
          item[property] = translations[value];
        }
      }
    }
  }

  return value;
}

// GUIDs für Objekte
const rarityIds: { [key: string]: number } = {
  Common: 118002,
  Uncommon: 118003,
  Rare: 118004,
  Epic: 118005,
  Legendary: 118006,
};

const upgradeIds: { [key: string]: number } = {
  ProductivityUpgrade: 118000,
  MaintenanceUpgrade: 2320,
  ReplaceInputs: 20081,
  AttractivenessUpgrade: 12691,
  PublicServiceDistance: 2321,
  AdditionalOutput: 20074,
  ReplacingWorkforce: 12480,
  WorkforceAmountUpgrade: 12337,
  ModuleLimitPercent: 12075,
  NeededAreaPercentUpgrade: 15319,
  IncidentFireIncreaseUpgrade: 12225,
  ProvideIndustrialization: 12485,
  IncidentExplosionIncreaseUpgrade: 22143,
  IncidentRiotIncreaseUpgrade: 14513,
  PipeCapacityUpgrade: 127395,
  RiotInfluenceUpgrade: 14290,
  AdditionalHappiness: 12314,
  ResolverUnitDecreaseUpgrade: 21508,
  ResolverUnitMovementSpeedUpgrade: 12012,
  ResolverUnitCountUpgrade: 3897,
  AddedFertility: 23371,
  AttractivenessPositive: 145011,
  PublicServiceFullSatisfactionDistance: 12014,
  InputBenefitModifier: 12690,
  ResidentsUpgrade: 2322,
  TaxModifierInPercent: 12677,
  IncidentIllnessIncreaseUpgrade: 12226,
  NeedProvideNeedUpgrade: 12315,
  StressUpgrade: 2323,
  GoodConsumptionUpgrade: 21386, // noch nicht perfekt bestimmt
  WorkforceModifierInPercent: 12676,
  InputAmountUpgrade: 23509,
  SpecialUnitHappinessThresholdUpgrade: 21593,
  BlockHostileTakeover: 15801, // Nicht optimal.
  SpawnProbabilityFactor: 20084, // Besondere Gäste
  ConstructionCostInPercent: 12723,
  AddAssemblyOptions: 21494, // noch zu definieren
  BaseDamageUpgrade: 2334, // Schaden pro Schuss
  AttackSpeedUpgrade: 2336,
  Hitpoints: 2333,
  GenProbability: 12920,
  GenPool: 12315, // Nicht perfekt
  BlockBuyShare: 15802,
  HappinessIgnoresMorale: 15811,
  MaxHitpointsUpgrade: 1154,
  AttackRangeUpgrade: 12021,
  HitpointDamage: 2334,
  LineOfSightRangeUpgrade: 15266,
  SelfHealUpgrade: 15195,
  SelfHealPausedTimeIfAttackedUpgrade: 15196,
  HealRadiusUpgrade: 15264,
  HealPerMinuteUpgrade: 15265,
  HealBuildingsPerMinuteUpgrade: 15265,
  AccuracyUpgrade: 12062,
  PierSpeedUpgrade: 15197,
  DamageReceiveFactor: 19136,
  MoraleDamage: 9499,
};
