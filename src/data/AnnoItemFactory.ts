/* eslint-disable @typescript-eslint/no-explicit-any */
import { rarities } from "../anno-config";
import { AnnoItem, EffectTarget } from "./AnnoItem";

const ignoredUpdates = [
  "PublicServiceNoSatisfactionDistance",
  "PublicServiceFullSatisfactionDistance",
  "OutputAmountFactorUpgrade",
];

export default class AnnoItemFactory {
  private translations: Record<number, string>;
  private effectTargetPoolById: Record<number, any>;
  private rewardPoolById: Record<number, any>;

  constructor(
    translations: Record<number, string>,
    effectTargetPoolById: Record<number, any>,
    rewardPoolById: Record<number, any>,
  ) {
    this.translations = translations;
    this.effectTargetPoolById = effectTargetPoolById;
    this.rewardPoolById = rewardPoolById;
  }

  public newAnnoItem(asset: any): AnnoItem {
    const values = asset.Values;

    const rarity = values.Item.Rarity?.toLowerCase() || rarities[0].key;
    const iconPath = values.Standard.IconFilename.replace("data/ui/2kimages/", "/img/").replace(".png", "_0.png");

    return {
      id: values.Standard.GUID,
      type: (asset.Values.Item && asset.Values.Item.Allocation
        ? asset.Values.Item.Allocation + "item"
        : asset.Template
      ).toLowerCase(),
      name: this.translate(values.Standard.GUID),
      icon: iconPath,
      effectTargets: this.resolveEffectTarget(values),
      activeItem:
        values.ItemAction?.ActiveBuff !== undefined ||
        values.ItemAction?.ItemAction !== undefined ||
        values.ItemAction?.ActionTarget !== undefined,
      expeditionAttributes: this.resolveExpeditionAttributes(values),
      rarity: rarity,
      rarityLabel: this.translations[rarities.find((r) => r.key === rarity)?.labelId as number],
      upgrades: this.getUpgrades(values),
    };
  }

  private resolveEffectTarget(values: any): EffectTarget[] {
    if (!values.ItemEffect) {
      return [];
    }

    let effectTargets = values.ItemEffect.EffectTargets.Item;

    if (!Array.isArray(effectTargets)) {
      effectTargets = [effectTargets];
    }

    return effectTargets
      .flatMap((target: any) => {
        const effectTargetPool = this.effectTargetPoolById[target.GUID];
        if (!effectTargetPool) {
          return [
            {
              label: this.translations[target.GUID],
              visible: true,
            },
          ];
        }

        let effectTargets = effectTargetPool.Values.ItemEffectTargetPool.EffectTargetGUIDs.Item;
        if (!Array.isArray(effectTargets)) {
          effectTargets = [effectTargets];
        }

        return [
          {
            label: this.translations[target.GUID] ?? this.translations[effectTargetPool.Values.Text.TextOverride],
            visible: true,
          },
          ...effectTargets.map((et: any) => ({
            label: this.translations[et.GUID],
            visible: false,
          })),
        ];
      })
      .filter((target: EffectTarget) => target.label);
  }

  private resolveExpeditionAttributes(values: any) {
    let attributes = values.ExpeditionAttribute?.ExpeditionAttributes?.Item || [];
    if (!Array.isArray(attributes)) {
      attributes = [attributes];
    }

    return attributes
      .filter((attribute: any) => attribute?.Attribute)
      .map((attribute: any) => ({
        key: attribute.Attribute.toLowerCase(),
        value: attribute.Amount || 1,
      }));
  }

  private getUpgrades(values: any) {
    return Object.entries(values)
      .filter(([key, value]) => key.includes("Upgrade") && value !== "")
      .flatMap(([, value]: any[]) =>
        Object.entries(value).map(([upgradeKey, v]: [string, any]) => ({
          key: upgradeKey,
          value: this.translateValue(upgradeKey, v),
        })),
      )
      .filter((upgrade) => !ignoredUpdates.includes(upgrade.key));
  }

  private translateValue(upgradeKey: string, value: any): any {
    if (upgradeKey === "GenPool") {
      const genPool = this.rewardPoolById[value];
      if (!genPool) {
        return [value];
      }
      let products = genPool.Values.RewardPool.ItemsPool.Item;
      if (!Array.isArray(products)) {
        products = [products];
      }

      return products.map((p: any) => this.translations[p.ItemLink]);
    }

    if (typeof value === "number" && value >= 1000 && this.translations[value]) {
      return this.translations[value];
    }

    if (typeof value === "object" && typeof value.Item === "object" && !Array.isArray(value.Item)) {
      value.Item = [value.Item];
    }

    if (typeof value === "object" && Array.isArray(value.Item)) {
      for (const item of value.Item) {
        for (const property in item) {
          const value = item[property];

          if (typeof value === "number" && value >= 100 && this.translations[value]) {
            item[`${property}_label`] = this.translations[value];
          }
        }
      }
    }

    return value;
  }

  private translate(key: number) {
    return this.translations[key]?.replace("<br/>", "");
  }
}
