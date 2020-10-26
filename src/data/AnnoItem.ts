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
  Upgrades: string[];
}

export function newAnnoItem(asset: any): AnnoItem {
  const values = asset.Values;

  return {
    GUID: values.Standard.GUID,
    Name: translations[values.Standard.GUID],
    Icon: values.Standard.IconFilename.replace(
      "data/ui/2kimages",
      "/img"
    ).replace(".png", "_0.png"),
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
    .map(
      ([key, value]: any[]) =>
        `${key}: ${Object.entries(value)
          .map(([vk, v]: any[]) => `${vk}: ${v.Value ? v.Value : "TBD"}`)
          .join(" ")}`
    );
}
