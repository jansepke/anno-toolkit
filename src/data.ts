import parser from "fast-xml-parser";
import { promises as fs } from "fs";

const cacheFolder = "./cached-data";

const items: { [key: string]: any[] } = {};
const guids: { [key: number]: any } = {};

export async function getData() {
  const cachedDir = await fs.mkdir(cacheFolder, { recursive: true });

  // return cached data
  if (cachedDir === undefined) {
    return {
      HarborOfficeItem: await readCachedData("HarborOfficeItem"),
      GuildhouseItem: await readCachedData("GuildhouseItem"),
      TownhallItem: await readCachedData("TownhallItem"),
    };
  }

  const xml = await fs.readFile("./data/assets.xml", "utf8");
  const json = parseXML(xml);

  processGroups(json.AssetList.Groups.Group);

  items.HarborOfficeItem.forEach(resolveEffectTarget);
  items.GuildhouseItem.forEach(resolveEffectTarget);
  items.TownhallItem.forEach(resolveEffectTarget);

  // write cached data
  for (const [assetType, assets] of Object.entries(items)) {
    await fs.writeFile(cachedFile(assetType), JSON.stringify(assets, null, 2));
  }

  // console.log(items.GuildhouseItem.length); // 472
  // console.log(items.HarborOfficeItem.length); // 55
  // console.log(items.TownhallItem.length); // 237
  // console.log(items.VehicleItem.length); // 51
  // console.log(items.ShipSpecialist.length); // 48
  // console.log(items.CultureItem.length); // 162

  return {
    HarborOfficeItem: items.HarborOfficeItem,
    GuildhouseItem: items.GuildhouseItem,
    TownhallItem: items.TownhallItem,
  };
}

function cachedFile(assetType: string) {
  return `${cacheFolder}/${assetType.replace("/", "-")}.json`;
}

async function readCachedData(assetType: string) {
  const rawData = await fs.readFile(cachedFile(assetType), "utf-8");
  return JSON.parse(rawData);
}

function parseXML(xml: string) {
  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
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

    if (!items[asset.Template]) {
      items[asset.Template] = [];
    }

    // remove empty properties
    for (var propName in asset.Values) {
      if (asset.Values[propName] === "") {
        delete asset.Values[propName];
      }
    }

    items[asset.Template].push(asset);
    guids[asset.Values.Standard.GUID] = asset;
  }
}

function resolveEffectTarget(item: any) {
  let effectTargets = item.Values.ItemEffect.EffectTargets.Item;

  if (!Array.isArray(effectTargets)) {
    effectTargets = [effectTargets];
  }

  item.Values.ItemEffect.EffectTargets.Text = effectTargets
    .map((target: any) => guids[target.GUID])
    .filter((target: any) => target)
    .map((target: any) => target.Values.Text.LocaText.English.Text)
    .join(", ");
}
