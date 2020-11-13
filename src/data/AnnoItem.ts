import { rarities } from "../config.json";
import { effectTargetPoolById, rewardPoolById, translations } from "./data";

export interface EffectTarget {
  label: string;
  visible: boolean;
}

export interface AnnoItem {
  id: number;
  name: string;
  icon: string;
  rarity: string;
  rarityLabel: string;
  effectTargets: EffectTarget[];
  // TODO: ItemAction
  // TODO: ExpeditionAttribute
  upgrades: { key: string; label: string; value: any }[];
}

export function newAnnoItem(asset: any): AnnoItem {
  const values = asset.Values;

  const rarity = values.Item.Rarity?.toLowerCase() || rarities[0].key;
  const iconPath = values.Standard.IconFilename.replace(
    "data/ui/2kimages/",
    "/img/"
  ).replace(".png", "_0.png");

  return {
    id: values.Standard.GUID,
    name: translations[values.Standard.GUID],
    icon: iconPath,
    effectTargets: resolveEffectTarget(values),
    rarity: rarity,
    rarityLabel:
      translations[rarities.find((r) => r.key === rarity)?.labelId as number],
    upgrades: getUpgrades(values),
  };
}

function resolveEffectTarget(values: any): EffectTarget[] {
  let effectTargets = values.ItemEffect.EffectTargets.Item;

  if (!Array.isArray(effectTargets)) {
    effectTargets = [effectTargets];
  }

  return effectTargets
    .flatMap((target: any) => {
      const effectTargetPool = effectTargetPoolById[target.GUID];
      if (!effectTargetPool) {
        return [
          {
            label: translations[target.GUID],
            visible: true,
          },
        ];
      }

      let effectTargets =
        effectTargetPool.Values.ItemEffectTargetPool.EffectTargetGUIDs.Item;
      if (!Array.isArray(effectTargets)) {
        effectTargets = [effectTargets];
      }

      return [
        {
          label: translations[target.GUID],
          visible: true,
        },
        ...effectTargets.map((et: any) => ({
          label: translations[et.GUID],
          visible: false,
        })),
      ];
    })
    .filter((target: EffectTarget) => target.label);
}

function getUpgrades(values: any) {
  return Object.entries(values)
    .filter(([key, value]) => key.includes("Upgrade") && value !== "")
    .flatMap(([, value]: any[]) =>
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
    const genPool = rewardPoolById[value];
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

const upgradeIds: { [key: string]: number } = {
  ProductivityUpgrade: 118000,
  MaintenanceUpgrade: 2320,
  ReplaceInputs: 20081,
  AttractivenessUpgrade: 145011,
  PublicServiceDistance: 2321,
  AdditionalOutput: 20074,
  ReplacingWorkforce: 12480,
  WorkforceAmountUpgrade: 12337,
  ModuleLimitPercent: 12075,
  NeededAreaPercentUpgrade: 15319,
  IncidentFireIncreaseUpgrade: 12225,
  ProvideIndustrialization: 12485,
  IncidentExplosionIncreaseUpgrade: 22143,
  IncidentRiotIncreaseUpgrade: 14290,
  PipeCapacityUpgrade: 127395,
  RiotInfluenceUpgrade: 14513,
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
