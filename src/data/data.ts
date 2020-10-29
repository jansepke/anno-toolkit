import { AnnoItem } from "./AnnoItem";
import { assetsByType, getItems, loadAssets } from "./assets";
import { ensureCacheFolder } from "./file";
import { loadTranslations, translations } from "./translations";

export interface PageData {
  items: AnnoItem[];
  tabs: { key: string; label: string }[];
}

export async function getData(
  language: string,
  assetType: string
): Promise<PageData> {
  await ensureCacheFolder();

  // load from disk if not cached
  if (!assetsByType[assetType]) {
    await loadTranslations(language);
    await loadAssets();
  }

  return {
    items: await getItems(assetType),
    tabs: [
      { key: "harboroffice", label: translations[4065] },
      { key: "guildhouse", label: translations[2346] },
      { key: "townhall", label: translations[2347] },
    ],
  };
}
