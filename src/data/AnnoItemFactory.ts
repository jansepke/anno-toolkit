import { rarities } from "../anno-config";
import { AnnoItem, AssetPool, EffectTarget } from "./AnnoItem";

export default class AnnoItemFactory {
  private translations: { [key: number]: string };
  private effectTargetPoolById: { [key: number]: any };
  private rewardPoolById: { [key: number]: any };
  private assetPoolById: { [key: number]: any };

  constructor(
    translations: { [key: number]: string },
    effectTargetPoolById: { [key: number]: any },
    rewardPoolById: { [key: number]: any },
    assetPoolById: { [key: number]: any },
  ) {
    this.translations = translations;
    this.effectTargetPoolById = effectTargetPoolById;
    this.rewardPoolById = rewardPoolById;
    this.assetPoolById = assetPoolById;
  }

  public newAnnoItem(asset: any): AnnoItem {
    const values = asset.Values;

    const assetPools = this.resolveAssetPools(values)

    const rarity = values.Item.Rarity?.toLowerCase() || rarities[0].key;
    const iconPath = values.Standard.IconFilename.replace(
      "data/ui/2kimages/",
      "/img/"
    ).replace(".png", "_0.png");

    return {
      id: values.Standard.GUID,
      type: (asset.Values.Item && asset.Values.Item.Allocation
        ? asset.Values.Item.Allocation + "item"
        : asset.Template
      ).toLowerCase(),
      name: this.translations[values.Standard.GUID],
      icon: iconPath,
      effectTargets: this.resolveEffectTarget(values),
      activeItem:
        values.ItemAction?.ActiveBuff !== undefined ||
        values.ItemAction?.ItemAction !== undefined ||
        values.ItemAction?.ActionTarget !== undefined,
      expeditionAttributes: this.resolveExpeditionAttributes(values),
      rarity: rarity,
      rarityLabel:
        this.translations[
          rarities.find((r) => r.key === rarity)?.labelId as number
        ],
      upgrades: this.getUpgrades(values),
      assetPools: assetPools,
      worlds: this.resolveWorldFromAssetPools(assetPools)
    };
  }

  private resolveAssetPools(values: any): AssetPool[] {
    let o: AssetPool[] = []

    Object.values(this.assetPoolById).forEach(assetpool => {
      try{
        if(!Array.isArray(assetpool.Values.AssetPool.AssetList.Item)) {
          if(assetpool.Values.AssetPool.AssetList.Item.Asset == values.Standard.GUID){
            o.push({
              label: assetpool.Values.Standard.Name,
              id: assetpool.Values.Standard.GUID
            })
          }
        }else{
          if(assetpool.Values.AssetPool.AssetList.Item.filter((obj: { Asset: any; }) => obj.Asset == values.Standard.GUID).length >= 1){
            o.push({
              label: assetpool.Values.Standard.Name,
              id: assetpool.Values.Standard.GUID
            })
          }
        }
      }catch(e){
      }
    })

    if(o.length == 0){
      o.push({
        label:"",
        id: 0
      })
    }

    return o
  }

  
  private resolveWorldFromAssetPools(assetPools: AssetPool[]): Array<string> {
    let o: string[] = []
    assetPools.forEach(assetPool => {
      let mapping = {
        "Old World": ["Worker", "Farmer", "Artisans", "Engineers", "Investors", "Scholars"],
        "New World": ["Jornalero", "Obreros"],
        "Arctic": ["Arctic", "Technicians"],
        "Enbesa": ["Shepherds", "Elders"]
      }
      Object.entries(mapping).forEach(keyval => {
        if(keyval[1].filter(needle => assetPool.label.includes(needle)).length >= 1){
          o.push(keyval[0])
        }
      })
    })

    return o
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

        let effectTargets =
          effectTargetPool.Values.ItemEffectTargetPool.EffectTargetGUIDs.Item;
        if (!Array.isArray(effectTargets)) {
          effectTargets = [effectTargets];
        }

        return [
          {
            label: this.translations[target.GUID],
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
    let attributes =
      values.ExpeditionAttribute?.ExpeditionAttributes?.Item || [];
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
        }))
      )
      .filter(
        (upgrade) => upgrade.key !== "PublicServiceNoSatisfactionDistance"
      );
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

    if (
      typeof value === "number" &&
      value >= 10000 &&
      this.translations[value]
    ) {
      return this.translations[value];
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
            this.translations[value]
          ) {
            item[`${property}_label`] = this.translations[value];
          }
        }
      }
    }

    return value;
  }
}
