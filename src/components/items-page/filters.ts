import { upgrades } from "../../anno-config";
import { AnnoItem, Upgrade } from "../../data/AnnoItem";

export function byItemName(filterValue: string) {
  return (item: AnnoItem) => filterValue === "" || item.name.toLowerCase().includes(filterValue.toLowerCase());
}

export function byEffectTarget(filterValue: string) {
  return (item: AnnoItem) => filterValue === "all" || item.effectTargets.some((et) => et.label === filterValue);
}

export function byUpgrades(filterValues: string[]) {
  return (item: AnnoItem) => {
    if (filterValues.includes("all")) {
      return true;
    }

    return filterValues.every((filterValue) => {
      const upgrade = upgrades.find((u) => u.key === filterValue);
      let additionalCheck: (u: Upgrade) => boolean = () => true;
      if (upgrade?.valueIs === "negative") {
        additionalCheck = (u) => getValue(u.value) < 0;
      }
      if (upgrade?.valueIs === "positive") {
        additionalCheck = (u) => getValue(u.value) > 0 || getValue(u.value) === -100;
      }

      return item.upgrades.some((u) => u.key === filterValue && additionalCheck(u));
    });
  };
}

export function byRarity(filterValue: string) {
  return (item: AnnoItem) => filterValue === "all" || item.rarityLabel === filterValue;
}

export function byFavourite(filterValue: boolean) {
  return (item: AnnoItem) => filterValue === false || item.favourite;
}

function getValue(value: number | { Value: number }) {
  return typeof value === "number" ? value : value.Value;
}
