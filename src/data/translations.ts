import { parseXMLDataFile, saveToCache } from "./file";

export const translations: { [key: number]: string } = {};

export async function loadTranslations(language: string) {
  console.log("Loading Translations...");

  const json = await parseXMLDataFile(`texts_${language}`);

  for (const item of json.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text;
  }

  await saveToCache(`texts_${language}`, json);
}
