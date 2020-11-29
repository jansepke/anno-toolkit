export interface EffectTarget {
  label: string;
  visible: boolean;
}

export interface Upgrade {
  key: string;
  label?: string;
  value: any;
}

export interface ExpeditionAttribute {
  key: string;
  value: number;
}

export interface AnnoItem {
  id: number;
  name: string;
  icon: string;
  rarity: string;
  rarityLabel: string;
  effectTargets: EffectTarget[];
  // TODO: ItemAction
  expeditionAttributes: ExpeditionAttribute[];
  upgrades: Upgrade[];
  favourite?: boolean;
}
