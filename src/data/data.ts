import { promises as fs } from "fs";
import { itemTypes } from "../anno-config.json";
import { AnnoItem } from "./AnnoItem";
import AnnoItemFactory from "./AnnoItemFactory";

export async function getEffectItems(
  language: string,
  itemType: string
): Promise<AnnoItem[]> {
  const fileNames = itemTypes.find((it) => it.key === itemType)
    ?.fileNames as string[];

  return await getData(language, fileNames, filterActiveItems);
}

export async function getExpeditionItems(
  language: string,
  threat: string
): Promise<AnnoItem[]> {
  const fileNames = itemTypes.flatMap((it) => it.fileNames);

  const items = await getData(language, fileNames, () => true);

  return items.filter((item) =>
    item.expeditionAttributes.some((attribute) => attribute.key === threat)
  );
}

async function getData(
  language: string,
  fileNames: string[],
  filter: (asset: any) => boolean
): Promise<AnnoItem[]> {
  const translations = await loadTranslations(language);
  const rewardPoolById = await loadRewardPools();
  const effectTargetPoolById = await loadEffectTargetPools();
  const assets = (
    await Promise.all(
      fileNames.map((fileName) => readFromCache("assets", fileName))
    )
  ).flat();

  const factory = new AnnoItemFactory(
    translations,
    effectTargetPoolById,
    rewardPoolById
  );

  return assets.filter(filter).map((asset: any) => factory.newAnnoItem(asset));
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

const fileCache: { [key: string]: Promise<any> } = {};

async function readFromCache(folder: string, file: string) {
  const fileName = `./data/anno/${folder}/${file.replace("/", "-")}.json`;

  if (!fileCache[fileName]) {
    console.log("Loading", folder, file);

    fileCache[fileName] = new Promise((resolve) => {
      fs.readFile(fileName, "utf-8").then((data) => resolve(JSON.parse(data)));
    });
  }

  return await fileCache[fileName];
}

function filterActiveItems(asset: any) {
  return (
    asset.Values.ItemAction?.ActiveBuff === undefined &&
    asset.Values.ItemAction?.ItemAction === undefined &&
    asset.Values.ItemAction?.ActionTarget === undefined
  );
}
