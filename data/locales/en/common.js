const { getTranslation } = require("../translations");

module.exports = {
  title: "Anno 1800 Items",
  itemName: "Item Name",
  effectTarget: "Building",
  rarity: "Rarity",
  upgrades: "Upgrades",
  target: "Targets",
  itemTypes: getTranslation("english", "itemTypes"),
  upgradeTypes: getTranslation("english", "upgrades"),
};
