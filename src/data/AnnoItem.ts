export interface EffectTarget {
  label: string;
  visible: boolean;
}

export interface Upgrade {
  key: string;
  label: string;
  value: any;
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
  upgrades: Upgrade[];
}
