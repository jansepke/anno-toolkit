import { translations } from "./translations";

export interface AnnoItem {
  GUID: number;
  Name: string;
  Icon: string;
  Type: string;
  Rarity: string;
  EffectTargets: string[];
  // TODO: ItemAction
  // TODO: ExpeditionAttribute
  Upgrades: { [key: string]: any }[];
}

export async function newAnnoItem(asset: any): Promise<AnnoItem> {
  const values = asset.Values;

  const iconPath = values.Standard.IconFilename.replace(
    "data/ui/2kimages/",
    "/img/"
  ).replace(".png", "_0.png");

  return {
    GUID: values.Standard.GUID,
    Name: translations[values.Standard.GUID],
    Icon: iconPath,
    EffectTargets: resolveEffectTarget(values),
    Type: values.Item.ItemType || "",
    Rarity: values.Item.Rarity || "Common",
    Upgrades: getUpgrades(values),
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
        key: vk,
        value: translateValue(v),
      }))
    );
}
function translateValue(v: any): any {
  if (typeof v === "number" && translations[v]) {
    return translations[v];
  }
  if (typeof v === "object" && typeof v.Item === "object") {
    for (const property in v.Item) {
      if (translations[v.Item[property]]) {
        v.Item[property] = translations[v.Item[property]];
      }
    }
  }
  return v;
}
