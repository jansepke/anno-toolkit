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
