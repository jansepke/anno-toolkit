const parser = require("fast-xml-parser");
const fs = require("fs").promises;
const { languages } = require("../anno-config.json");

main();

async function main() {
  await Promise.all([
    loadAssets(),
    ...languages.map((l) => loadTranslations(l.fileName)),
  ]);
}

async function loadTranslations(language) {
  console.log(`Loading ${language} Translations...`);

  const fileName = `texts_${language}`;

  const json = await parseXMLDataFile(fileName);

  await saveToCache("texts", fileName, json);
}

const assetsByType = {};
async function loadAssets() {
  console.log("Loading Assets...");

  const json = await parseXMLDataFile("assets");

  processGroups(json.AssetList.Groups.Group);

  // write cached data
  for (const [assetType, assets] of Object.entries(assetsByType)) {
    await saveToCache("assets", assetType, assets);
  }
}

function processGroups(groups) {
  for (const group of Array.from(groups)) {
    if (group.Assets) {
      processAssets(group.Assets.Asset);
    }

    if (group.Groups) {
      processGroups(group.Groups.Group);
    }
  }
}

function processAssets(assets) {
  for (const asset of Array.from(assets)) {
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

async function parseXMLDataFile(file) {
  const xml = await fs.readFile(`./data/${file}.xml`, "utf8");

  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
}

async function saveToCache(folder, file, data) {
  const fileName = `./data/anno/${folder}/${file.replace("/", "-")}.json`;

  await fs.writeFile(fileName, JSON.stringify(data, null, 2));
}
