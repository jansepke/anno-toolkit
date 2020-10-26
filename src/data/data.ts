import { assetsByType, loadAssets } from "./assets";
import { cacheFileExists, ensureCacheFolder, readCachedJSONFile } from "./file";
import { loadTranslations } from "./translations";

export async function getData(language: string, assetType: string) {
  await ensureCacheFolder();

  // return cached data
  if (await cacheFileExists(assetType)) {
    return {
      items: await readCachedJSONFile(assetType),
    };
  }

  await loadTranslations(language);
  await loadAssets();

  return {
    items: assetsByType[assetType],
  };
}
