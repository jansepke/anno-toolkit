const { getTranslations } = require("../translations");

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
  trader: "Trader",
  comingSoon: "Coming soon...",
  index: {
    intro:
      "Anno 1800 toolkit provides you some useful tools around items and specialists in Anno 1800. Find the best fitting item to optimize your production or the specialist that will get the most out of your residents. You can also search items that you will need to increase success on your expeditions.",
    about:
      "Anno 1800 toolkit is developed by some Anno fans who wanted to simplify searching for the right item. If you find a bug or have a feature request open an issue <0>here</0>. This application is licensed under <1>MIT license</1>.",
  },
  ...getTranslations("english"),
};
