import { rarities, upgrades } from "../anno-config.json";
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
        label:
          translations[
            upgrades.find((u) => u.key === upgradeKey)?.labelId || 0
          ] || upgradeKey,
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
