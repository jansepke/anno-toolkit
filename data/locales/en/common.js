const { getTranslation } = require("../translations");

module.exports = {
  title: {
    index: "Anno 1800 toolkit",
    items: "Anno 1800 Items",
    expedition: "Anno 1800 Expeditions",
  },
  heading: {
    items: "Items / Specialists Effects",
    expedition: "Expedition Attributes",
  },
  filter: {
    itemName: "Item Name",
    effectTarget: "Building",
    rarity: "Rarity",
    upgrades: "Upgrades",
    onlyFavourites: "My Favourites",
  },
  target: "Targets",
  comingSoon: "Coming soon...",
  itemTypes: getTranslation("english", "itemTypes"),
  upgradeTypes: getTranslation("english", "upgrades"),
};
