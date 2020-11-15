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
  const fileName = itemTypes.find((it) => it.key === assetType)
    ?.fileName as string;

  const translations = await loadTranslations(language);
  const rewardPoolById = await loadRewardPools();
  const effectTargetPoolById = await loadEffectTargetPools();
  const assets = await readFromCache("assets", fileName);

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
    tabs: itemTypes
      .filter((t) => !t.hidden)
      .map((t) => ({
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
  const json = await readFromCache("texts", `texts_${language}`);

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
  const rewardPools = await readFromCache("assets", "rewardpool");

  const rewardPoolById: { [key: number]: any } = {};

  for (const rewardPool of rewardPools) {
    rewardPoolById[rewardPool.Values.Standard.GUID] = rewardPool;
  }

  return rewardPoolById;
}

async function loadEffectTargetPools() {
  const effectTargetPools = await readFromCache(
    "assets",
    "itemeffecttargetpool"
  );

  const effectTargetPoolById: { [key: number]: any } = {};

  for (const effectPool of effectTargetPools) {
    effectTargetPoolById[effectPool.Values.Standard.GUID] = effectPool;
  }

  return effectTargetPoolById;
}

async function readFromCache(folder: string, file: string) {
  const fileName = `./data/anno/${folder}/${file.replace("/", "-")}.json`;

  const data = await fs.readFile(fileName, "utf-8");
  return JSON.parse(data);
}
