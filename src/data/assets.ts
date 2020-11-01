import { AnnoItem, newAnnoItem } from "./AnnoItem";
import {
  cacheFileExists,
  parseXMLDataFile,
  readFromCache,
  saveToCache,
} from "./file";

const assetsByType: { [key: string]: any[] } = {};
export const rewardPoolIDs: { [key: number]: any } = {};

export async function loadAssets(assetType: string) {
  console.log("Loading Assets...");

  const cachedAsset = await cacheFileExists(assetType);
  const cachedRewarpool = await cacheFileExists("rewardpool");

  if (cachedAsset && cachedRewarpool) {
    assetsByType[assetType] = await readFromCache(assetType);
    assetsByType.rewardpool = await readFromCache("rewardpool");
  } else {
    const json = await parseXMLDataFile("assets");

    processGroups(json.AssetList.Groups.Group);

    // write cached data
    for (const [assetType, assets] of Object.entries(assetsByType)) {
      await saveToCache(assetType, assets);
    }
  }

  for (const rewardpool of assetsByType.rewardpool) {
    rewardPoolIDs[rewardpool.Values.Standard.GUID] = rewardpool;
  }

  // console.log(items.GuildhouseItem.length); // 472
  // console.log(items.HarborOfficeItem.length); // 55
  // console.log(items.TownhallItem.length); // 237
  // console.log(items.VehicleItem.length); // 51
  // console.log(items.ShipSpecialist.length); // 48
  // console.log(items.CultureItem.length); // 162
}

function processGroups(groups: any) {
  for (const group of Array.from<any>(groups)) {
    if (group.Assets) {
      processAssets(group.Assets.Asset);
    }

    if (group.Groups) {
      processGroups(group.Groups.Group);
    }
  }
}

function processAssets(assets: any) {
  for (const asset of Array.from<any>(assets)) {
    if (!asset.Template) {
      continue;
    }

    const assetType = (asset.Values.Item?.Allocation
      ? asset.Values.Item.Allocation + "item"
      : asset.Template
    ).toLowerCase();

    if (!assetsByType[assetType]) {
      assetsByType[assetType] = [];
    }

    assetsByType[assetType].push(asset);
  }
}

export async function getItems(assetType: string) {
  const assets: AnnoItem[] = [];

  for (const asset of assetsByType[assetType]) {
    if (asset.Values.ItemAction) {
      continue;
    }

    assets.push(await newAnnoItem(asset));
  }

  return assets;
}
