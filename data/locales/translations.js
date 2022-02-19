const config = require("../../src/anno-config");

function getTranslationFromConfig(translations, group) {
  return config[group].reduce(
    (all, item) => ({
      ...all,
      [item.key]: translations[item.labelId],
    }),
    {}
  );
}

module.exports.getTranslations = function (language) {
  const translations = require(`../anno/texts/texts_${language}.json`);

  return {
    itemTypes: getTranslationFromConfig(translations, "itemTypes"),
    upgrades: getTranslationFromConfig(translations, "upgrades"),
    expeditionThreats: getTranslationFromConfig(
      translations,
      "expeditionThreats"
    ),
  };
};
