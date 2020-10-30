import {
  cacheFileExists,
  parseXMLDataFile,
  readFromCache,
  saveToCache,
} from "./file";

export const translations: { [key: number]: string } = {};

export async function loadTranslations(language: string) {
  if (Object.keys(translations).length > 0) {
    return;
  }

  console.log("Loading Translations...");

  const fileName = `texts_${language}`;

  const cached = await cacheFileExists(fileName);
  const json = cached
    ? await readFromCache(fileName)
    : await parseXMLDataFile(fileName);

  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }

  if (!cached) {
    await saveToCache(fileName, json);
  }
}
