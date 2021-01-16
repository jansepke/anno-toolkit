import { promises as fs } from "fs";
import { itemTypes } from "../anno-config.json";
import { AnnoItem } from "./AnnoItem";

export async function getEffectItems(
  language: string,
  itemType: string
): Promise<AnnoItem[]> {
  const types = itemTypes.find((it) => it.key === itemType)
    ?.fileNames as string[];

  const data = await readDb(language);

  return data.filter((it) => types.includes(it.type) && !it.activeItem);
}

export async function getExpeditionItems(
  language: string,
  threat: string
): Promise<AnnoItem[]> {
  const data = await readDb(language);

  return data.filter((item) =>
    item.expeditionAttributes.some((attribute) => attribute.key === threat)
  );
}

async function readDb(language: string) {
  const data = await fs.readFile(`./data/db/${language}.json`, "utf8");

  return JSON.parse(data) as AnnoItem[];
}
