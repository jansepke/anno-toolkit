const config = require("../../src/anno-config.json");

module.exports.getTranslation = function (language, group) {
  const translationJson = require(`../anno/texts/texts_${language}.json`);

  const translations = {};
  for (const item of translationJson.TextExport.Texts.Text) {
    translations[item.GUID] = item.Text.replace
      ? item.Text.replace(/\[.*\]/g, "")
          .replace(/\s\s/g, " ")
          .replace(": .", "")
      : item.Text;
  }

  return config[group].reduce(
    (all, item) => ({
      ...all,
      [item.key]: translations[item.labelId],
    }),
    {}
  );
};
