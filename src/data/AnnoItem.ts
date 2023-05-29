export interface EffectTarget {
  label: string;
  visible: boolean;
}

export interface Upgrade {
  key: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface ExpeditionAttribute {
  key: string;
  value: number;
}

export interface AnnoItem {
  id: number;
  name: string;
  type: string;
  icon: string;
  rarity: string;
  rarityLabel: string;
  effectTargets: EffectTarget[];
  // TODO: ItemAction
  activeItem: boolean;
  expeditionAttributes: ExpeditionAttribute[];
  upgrades: Upgrade[];
  favourite?: boolean;
}
