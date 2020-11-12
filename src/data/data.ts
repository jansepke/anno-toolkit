import { promises as fs } from "fs";
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
export const rewardPoolIDs: { [key: number]: any } = {};

export async function getData(
  language: string,
  assetType: string
): Promise<PageData> {
  await loadTranslations(language);
  await loadRewardPool();
  const assets = await readFromCache(assetType);

  const items: AnnoItem[] = assets
    .filter((asset: any) => asset.Values.ItemAction === "")
    .map((asset: any) => newAnnoItem(asset));

  return {
    items: items,
    tabs: [
      { key: "harboroffice", label: translations[4065] },
      { key: "guildhouse", label: translations[2346] },
      { key: "townhall", label: translations[2347] },
    ],
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

async function loadRewardPool() {
  const rewardpools = await readFromCache("rewardpool");

  for (const rewardpool of rewardpools) {
    rewardPoolIDs[rewardpool.Values.Standard.GUID] = rewardpool;
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
