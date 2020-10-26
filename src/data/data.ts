import { AnnoItem } from "./AnnoItem";
import { assetsByType, getItems, loadAssets } from "./assets";
import { ensureCacheFolder } from "./file";
import { loadTranslations } from "./translations";

export interface PageData {
  items: AnnoItem[];
  tabs: {
    [key: string]: {
      icon: string;
    };
  };
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
    tabs: {
      HarborOffice: {
        icon: await importIcon("HarborOffice"),
      },
      Guildhouse: {
        icon: await importIcon("Guildhouse"),
      },
      Townhall: {
        icon: await importIcon("Townhall"),
      },
    },
  };
}

async function importIcon(fileName: string) {
  const icon = await import(
    `../../data/img/${fileName.toLowerCase()}.png?resize&size=20`
  );
  return icon.default.src;
}
