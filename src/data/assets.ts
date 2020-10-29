import { AnnoItem, newAnnoItem } from "./AnnoItem";
import { parseXMLDataFile, saveToCache } from "./file";

export const assetsByType: { [key: string]: any[] } = {};
const guids: { [key: number]: any } = {};

export async function loadAssets() {
  console.log("Loading Assets...");

  const json = await parseXMLDataFile("assets");

  processGroups(json.AssetList.Groups.Group);

  // write cached data
  for (const [assetType, assets] of Object.entries(assetsByType)) {
    await saveToCache(assetType, assets);
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
    guids[asset.Values.Standard.GUID] = asset;
  }
}

export async function getItems(assetType: string) {
  const assets: AnnoItem[] = [];

  for (const asset of assetsByType[assetType]) {
    assets.push(await newAnnoItem(asset));
  }

  return assets;
}
