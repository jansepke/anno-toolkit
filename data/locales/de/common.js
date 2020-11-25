const { getTranslation } = require("../translations");

module.exports = {
  title: {
    index: "Anno 1800 toolkit",
    items: "Anno 1800 Items",
    expedition: "Anno 1800 Expeditionen",
  },
  heading: {
    items: "Items / Spezialisten Effekte",
    expedition: "Expeditionswerte",
  },
  itemName: "Item Name",
  effectTarget: "Gebäudetyp",
  rarity: "Seltenheit",
  upgrades: "Upgrades",
  target: "Beeinflusst",
  comingSoon: "Demnächst...",
  itemTypes: getTranslation("german", "itemTypes"),
  upgradeTypes: getTranslation("german", "upgrades"),
};
