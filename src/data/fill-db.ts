import { promises as fs } from "fs";
import { itemTypes, languages } from "../anno-config";
import { AnnoItem } from "./AnnoItem";
import AnnoItemFactory from "./AnnoItemFactory";

async function main() {
  for (const language of languages) {
    await generateDBForLanguage(language.fileName);
  }  
}

async function generateDBForLanguage(language: string) {
  const fileNames = itemTypes.flatMap((it) => it.fileNames);
  const data = await getData(language, fileNames);

  await fs.writeFile(
    `./data/db/${language}.json`,
    JSON.stringify(data, null, 2)
  );
}

export async function getData(
  language: string,
  fileNames: string[],
  filter: (asset: any) => boolean = () => true
): Promise<AnnoItem[]> {
  const translations = await loadTranslations(language);
  const rewardPoolById = await loadRewardPools();
  const effectTargetPoolById = await loadEffectTargetPools();

  const traderProfiles = await readFromCache("assets", "profile_3rdparty");
  const rewardItemPools = await loadRewardItemPools()

  const assets = (
    await Promise.all(
      fileNames.map((fileName) => readFromCache("assets", fileName))
    )
  ).flat();

  const factory = new AnnoItemFactory(
    translations,
    effectTargetPoolById,
    rewardPoolById,
    traderProfiles,
    rewardItemPools
  );

  return assets.filter(filter).map((asset: any) => factory.newAnnoItem(asset));
}

async function loadTranslations(language: string) {
  return await readFromCache("texts", `texts_${language}`);
}

async function loadRewardPools() {
  const rewardPools = await readFromCache("assets", "rewardpool");

  const rewardPoolById: { [key: number]: any } = {};

  for (const rewardPool of rewardPools) {
    rewardPoolById[rewardPool.Values.Standard.GUID] = rewardPool;
  }

  return rewardPoolById;
}

async function loadRewardItemPools() {
  const rewardItemPools = await readFromCache("assets", "rewarditempool");

  const rewardItemPoolById: { [key: number]: any } = {};

  for (const rewardItemPool of rewardItemPools) {
    rewardItemPoolById[rewardItemPool.Values.Standard.GUID] = rewardItemPool;
  }

  return rewardItemPoolById;
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

main();
