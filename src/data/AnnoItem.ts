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
  upgrades: { [key: string]: any }[];
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
      Object.entries(value).map(([vk, v]: any[]) => ({
        key: vk.replace("Upgrade", ""),
        value: translateValue(v),
      }))
    );
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
