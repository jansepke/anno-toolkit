import parser from "fast-xml-parser";
import { promises as fs } from "fs";

const cacheFolder = "./cached-data";

const assetsByType: { [key: string]: any[] } = {};
const guids: { [key: number]: any } = {};
const translations: { [key: number]: string } = {};

export async function getData(language: string, assetType: string) {
  await fs.mkdir(cacheFolder, { recursive: true });

  // return cached data
  if (await fileExists(cachedFile(assetType))) {
    return {
      items: await readCachedData(assetType),
    };
  }

  await parseLanguage(language);
  await parseAssets();

  return {
    items: assetsByType[assetType],
  };
}

async function parseLanguage(language: string) {
  const json = await parseXMLFile(`./data/texts_${language}.xml`);

  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text;
  }

  await fs.writeFile(
    cachedFile(`texts_${language}`),
    JSON.stringify(translations, null, 2)
  );
}

async function parseAssets() {
  const json = await parseXMLFile("./data/assets.xml");

  processGroups(json.AssetList.Groups.Group);

  assetsByType.HarborOfficeItem.forEach(enhanceAsset);
  assetsByType.GuildhouseItem.forEach(enhanceAsset);
  assetsByType.TownhallItem.forEach(enhanceAsset);

  // write cached data
  for (const [assetType, assets] of Object.entries(assetsByType)) {
    await fs.writeFile(cachedFile(assetType), JSON.stringify(assets, null, 2));
  }

  // console.log(items.GuildhouseItem.length); // 472
  // console.log(items.HarborOfficeItem.length); // 55
  // console.log(items.TownhallItem.length); // 237
  // console.log(items.VehicleItem.length); // 51
  // console.log(items.ShipSpecialist.length); // 48
  // console.log(items.CultureItem.length); // 162
}

async function parseXMLFile(filePath: string) {
  const xml = await fs.readFile(filePath, "utf8");

  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
}

function cachedFile(assetType: string) {
  return `${cacheFolder}/${assetType.replace("/", "-")}.json`;
}

async function readCachedData(assetType: string) {
  const rawData = await fs.readFile(cachedFile(assetType), "utf-8");
  return JSON.parse(rawData);
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

    if (!assetsByType[asset.Template]) {
      assetsByType[asset.Template] = [];
    }

    assetsByType[asset.Template].push(asset);
    guids[asset.Values.Standard.GUID] = asset;
  }
}

function enhanceAsset(asset: any) {
  resolveEffectTarget(asset);
  addTranslations(asset);
  removeEmptyProperties(asset);
}

function resolveEffectTarget(asset: any) {
  let effectTargets = asset.Values.ItemEffect.EffectTargets.Item;

  if (!Array.isArray(effectTargets)) {
    effectTargets = [effectTargets];
  }

  asset.Values.ItemEffect.EffectTargets.Text = effectTargets
    .map((target: any) => translations[target.GUID])
    .filter((target: any) => target)
    .join(", ");
}

function addTranslations(asset: any) {
  const translation = translations[asset.Values.Standard.GUID];
  asset.Values.Text.Translated = translation;
}

function removeEmptyProperties(asset: any) {
  for (var propName in asset.Values) {
    if (asset.Values[propName] === "") {
      delete asset.Values[propName];
    }
  }
}

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
