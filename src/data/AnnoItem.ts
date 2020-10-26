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

export async function newAnnoItem(asset: any): Promise<AnnoItem> {
  const values = asset.Values;

  const iconPath = values.Standard.IconFilename.replace(
    "data/ui/2kimages/",
    ""
  ).replace(".png", "_0.png");
  const icon = await import(`../../data/img/${iconPath}?resize&size=20`);

  return {
    GUID: values.Standard.GUID,
    Name: translations[values.Standard.GUID],
    Icon: icon.default.src,
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
