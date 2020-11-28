const { getTranslations } = require("../translations");

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
  filter: {
    itemName: "Item Name",
    effectTarget: "Gebäudetyp",
    rarity: "Seltenheit",
    upgrades: "Upgrades",
    onlyFavourites: "Meine Favouriten",
  },
  target: "Beeinflusst",
  comingSoon: "Demnächst...",
  ...getTranslations("german"),
};
