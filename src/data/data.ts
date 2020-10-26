import { assetsByType, getAssets, loadAssets } from "./assets";
import { ensureCacheFolder } from "./file";
import { loadTranslations } from "./translations";

export async function getData(language: string, assetType: string) {
  await ensureCacheFolder();

  // load from disk if not cached
  if (!assetsByType[assetType]) {
    await loadTranslations(language);
    await loadAssets();
  }

  return {
    items: getAssets(assetType),
  };
}
