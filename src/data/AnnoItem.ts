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
    rarity: values.Item.Rarity || "Common",
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
    .flatMap(([key, value]: any[]) =>
      Object.entries(value).map(([vk, v]: [string, any]) => ({
        key: vk,
        label: translations[upgradeIds[vk]] || vk,
        value: translateValue(v),
      }))
    )
    .filter((upgrade) => upgrade.key !== "PublicServiceNoSatisfactionDistance");
}

function translateValue(v: any): any {
  if (typeof v === "number" && v >= 10000 && translations[v]) {
    return translations[v];
  }

  if (
    typeof v === "object" &&
    typeof v.Item === "object" &&
    !Array.isArray(v.Item)
  ) {
    v.Item = [v.Item];
  }

  if (typeof v === "object" && Array.isArray(v.Item)) {
    for (const item of v.Item) {
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

  return v;
}

// GUIDs für Objekte
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
  IncidentRiotIncreaseUpgrade: 14292,
  PipeCapacityUpgrade: 2320,
  AddedFertility: 23371,
  AttractivenessPositive: 145011,
  Residents: 2322,
  AreaHappiness: 2323,
  Hitpoints: 2333,
};
