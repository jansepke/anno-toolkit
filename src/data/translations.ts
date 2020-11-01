import {
  cacheFileExists,
  parseXMLDataFile,
  readFromCache,
  saveToCache,
} from "./file";

export const translations: { [key: number]: string } = {};

let cachedLanguage: string;

export async function loadTranslations(language: string) {
  if (Object.keys(translations).length > 0 && cachedLanguage === language) {
    return;
  }

  console.log(`Loading ${language} Translations...`);

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

  cachedLanguage = language;

  if (!cached) {
    await saveToCache(fileName, json);
  }
}
