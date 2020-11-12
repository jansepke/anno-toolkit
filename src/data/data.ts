import { promises as fs } from "fs";
import { itemTypes } from "../config.json";
import { AnnoItem, newAnnoItem } from "./AnnoItem";

export interface TabData {
  key: string;
  label: string;
}

export interface PageData {
  items: AnnoItem[];
  tabs: TabData[];
}

export const translations: { [key: number]: string } = {};
export const rewardPoolById: { [key: number]: any } = {};
export const effectTargetPoolById: { [key: number]: any } = {};

export async function getData(
  language: string,
  assetType: string
): Promise<PageData> {
  await loadTranslations(language);
  await loadRewardPools();
  await loadEffectTargetPools();
  const assets = await readFromCache(assetType);

  const items: AnnoItem[] = assets
    .filter((asset: any) => asset.Values.ItemAction === "")
    .map((asset: any) => newAnnoItem(asset));

  return {
    items: items,
    tabs: itemTypes.map((t) => ({
      key: t.key,
      label: translations[t.labelId],
    })),
  };
}

async function loadTranslations(language: string) {
  const json = await readFromCache(`texts_${language}`);

  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }
}

async function loadRewardPools() {
  const rewardPools = await readFromCache("rewardpool");

  for (const rewardPool of rewardPools) {
    rewardPoolById[rewardPool.Values.Standard.GUID] = rewardPool;
  }
}

async function loadEffectTargetPools() {
  const effectTargetPools = await readFromCache("itemeffecttargetpool");

  for (const effectPool of effectTargetPools) {
    effectTargetPoolById[effectPool.Values.Standard.GUID] = effectPool;
  }
}

const cacheFolder = "./cached-data";

function cachedFile(assetType: string) {
  return `${cacheFolder}/${assetType.replace("/", "-")}.json`;
}

async function readFromCache(file: string) {
  const data = await fs.readFile(cachedFile(file), "utf-8");
  return JSON.parse(data);
}
