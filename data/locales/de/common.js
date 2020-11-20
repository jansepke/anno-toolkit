const { getTranslation } = require("../translations");

module.exports = {
  title: "Anno 1800 Items",
  itemName: "Item Name",
  effectTarget: "Gebäudetyp",
  rarity: "Seltenheit",
  upgrades: "Upgrades",
  target: "Beeinflusst",
  itemTypes: getTranslation("german", "itemTypes"),
  upgradeTypes: getTranslation("german", "upgrades"),
};
