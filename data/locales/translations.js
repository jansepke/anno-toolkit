const config = require("../../src/anno-config.json");

function getTranslationFromConfig(translations, group) {
  return config[group].reduce(
    (all, item) => ({
      ...all,
      [item.key]: translations[item.labelId],
    }),
    {}
  );
}

function getTranslationFromAsset(translations, asset) {
  return require(`../anno/assets/${asset}.json`).reduce(
    (all, asset) => ({
      ...all,
      [asset.Values.Standard.Name.toLowerCase()]: translations[
        asset.Values.Standard.GUID
      ],
    }),
    {}
  );
}

module.exports.getTranslations = function (language) {
  const translationJson = require(`../anno/texts/texts_${language}.json`);

  const translations = {};
  for (const item of translationJson.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }

  return {
    itemTypes: getTranslationFromConfig(translations, "itemTypes"),
    upgrades: getTranslationFromConfig(translations, "upgrades"),
    expeditionthreats: getTranslationFromAsset(
      translations,
      "expeditionthreat"
    ),
  };
};
