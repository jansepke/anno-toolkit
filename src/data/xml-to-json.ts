import parser from "fast-xml-parser";
import { promises as fs } from "fs";
import { languages } from "../anno-config.json";

main();

async function main() {
  await Promise.all([
    loadAssets(),
    ...languages.map((l) => loadTranslations(l.fileName)),
  ]);
}

async function loadTranslations(language: string) {
  console.log(`Loading ${language} Translations...`);

  const fileName = `texts_${language}`;

  const json = await parseXMLDataFile(fileName);
  const translations: { [key: string]: string } = {};
  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }

  await saveToCache("texts", fileName, translations);
}

const assetsByType: { [key: string]: any } = {};
async function loadAssets() {
  console.log("Loading Assets...");

  const json = await parseXMLDataFile("assets");

  processGroups(json.AssetList.Groups.Group);

  // write cached data
  for (const [assetType, assets] of Object.entries(assetsByType)) {
    await saveToCache("assets", assetType, assets);
  }
}

function processGroups(groups: any) {
  if (!Array.isArray(groups)) {
    groups = [groups];
  }

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
  if (!Array.isArray(assets)) {
    assets = [assets];
  }

  for (const asset of Array.from<any>(assets)) {
    if (!asset.Template) {
      continue;
    }

    const assetType = (asset.Values.Item && asset.Values.Item.Allocation
      ? asset.Values.Item.Allocation + "item"
      : asset.Template
    ).toLowerCase();

    if (!assetsByType[assetType]) {
      assetsByType[assetType] = [];
    }

    assetsByType[assetType].push(asset);
  }
}

async function parseXMLDataFile(file: string) {
  const xml = await fs.readFile(`./import-data/${file}.xml`, "utf8");

  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
}

async function saveToCache(folder: string, file: string, data: any) {
  const fileName = `./data/anno/${folder}/${file.replace("/", "-")}.json`;

  await fs.writeFile(fileName, JSON.stringify(data, null, 2));
}
