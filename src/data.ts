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

  processGroup(json.AssetList.Groups.Group);

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

function processGroup(groups: any) {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];

    if (group.Assets) {
      for (let j = 0; j < group.Assets.Asset.length; j++) {
        const asset = group.Assets.Asset[j];

        if (!asset.Template) {
          continue;
        }

        if (!items[asset.Template]) {
          items[asset.Template] = [];
        }

        for (var propName in asset.Values) {
          if (asset.Values[propName] === "") {
            delete asset.Values[propName];
          }
        }

        items[asset.Template].push(asset);
        guids[asset.Values.Standard.GUID] = asset;
      }
    }

    if (group.Groups) {
      processGroup(group.Groups.Group);
    }
  }
}

function resolveEffectTarget(item: any) {
  const guid = item.Values.ItemEffect.EffectTargets.Item.GUID;
  const effectTarget = guids[guid];

  if (effectTarget && effectTarget.Values.Text.LocaText.English.Text) {
    item.Values.ItemEffect.EffectTargets.Item.Text =
      effectTarget.Values.Text.LocaText.English.Text;
  }
}
