import { promises as fs } from "fs";
import { itemTypes, rarities } from "../anno-config.json";
import { AnnoItem } from "./AnnoItem";
import AnnoItemFactory from "./AnnoItemFactory";

export interface TabData {
  key: string;
  label: string;
}

export interface Rarity {
  key: string;
  label: string;
  color: string;
}

export interface PageData {
  items: AnnoItem[];
  tabs: TabData[];
  rarities: Rarity[];
}

export async function getData(
  language: string,
  assetType: string
): Promise<PageData> {
  const translations = await loadTranslations(language);
  const rewardPoolById = await loadRewardPools();
  const effectTargetPoolById = await loadEffectTargetPools();
  const assets = await readFromCache(assetType);

  const factory = new AnnoItemFactory(
    translations,
    effectTargetPoolById,
    rewardPoolById
  );

  const items: AnnoItem[] = assets
    .filter((asset: any) => asset.Values.ItemAction === "") // remove active items
    .map((asset: any) => factory.newAnnoItem(asset));

  return {
    items: items,
    tabs: itemTypes.map((t) => ({
      key: t.key,
      label: translations[t.labelId],
    })),
    rarities: rarities.map((r) => ({
      key: r.key,
      label: translations[r.labelId],
      color: r.color,
    })),
  };
}

async function loadTranslations(language: string) {
  const json = await readFromCache(`texts_${language}`);

  const translations: { [key: number]: string } = {};

  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }

  return translations;
}

async function loadRewardPools() {
  const rewardPools = await readFromCache("rewardpool");

  const rewardPoolById: { [key: number]: any } = {};

  for (const rewardPool of rewardPools) {
    rewardPoolById[rewardPool.Values.Standard.GUID] = rewardPool;
  }

  return rewardPoolById;
}

async function loadEffectTargetPools() {
  const effectTargetPools = await readFromCache("itemeffecttargetpool");

  const effectTargetPoolById: { [key: number]: any } = {};

  for (const effectPool of effectTargetPools) {
    effectTargetPoolById[effectPool.Values.Standard.GUID] = effectPool;
  }

  return effectTargetPoolById;
}

const cacheFolder = "./cached-data";

function cachedFile(assetType: string) {
  return `${cacheFolder}/${assetType.replace("/", "-")}.json`;
}

async function readFromCache(file: string) {
  const data = await fs.readFile(cachedFile(file), "utf-8");
  return JSON.parse(data);
}
