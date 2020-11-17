const config = require("../../../src/anno-config.json");
const translationJson = require("../../anno/texts/texts_english.json");

const translations = translationJson.TextExport.Texts.Text;

function getTranslation(group) {
  return config[group].reduce(
    (all, item) => ({
      ...all,
      [item.key]: translations.find((t) => t.GUID === item.labelId).Text,
    }),
    {}
  );
}

module.exports = {
  title: "Anno 1800 Items",
  itemName: "Item Name",
  effectTarget: "Building",
  rarity: "Rarity",
  upgrades: "Upgrades",
  target: "Targets",
  itemTypes: getTranslation("itemTypes"),
};
