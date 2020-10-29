import parser from "fast-xml-parser";
import { promises as fs } from "fs";

const cacheFolder = "./cached-data";

function cachedFile(assetType: string) {
  return `${cacheFolder}/${assetType.replace("/", "-")}.json`;
}

export async function parseXMLDataFile(file: string) {
  const xml = await fs.readFile(`./data/${file}.xml`, "utf8");

  try {
    return parser.parse(xml, {}, true);
  } catch (error) {
    throw new Error("Invalid XML");
  }
}

export async function saveToCache(file: string, data: any) {
  await fs.writeFile(cachedFile(file), JSON.stringify(data, null, 2));
}

export async function ensureCacheFolder() {
  await fs.mkdir(cacheFolder, { recursive: true });
}

export async function readFromCache(file: string) {
  const data = await fs.readFile(cachedFile(file), "utf-8");
  return JSON.parse(data);
}

export async function cacheFileExists(assetType: string) {
  try {
    await fs.access(cachedFile(assetType));
    return true;
  } catch (error) {
    return false;
  }
}
