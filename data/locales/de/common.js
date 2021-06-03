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
    onlyFavourites: "Meine Favoriten",
  },
  target: "Beeinflusst",
  comingSoon: "Demnächst...",
  index: {
    intro:
      "Anno 1800 toolkit stellt dir einige nützliche Tools rund um Items und Spezialisten in Anno 1800 bereit. Finde die besten Items, um deine Produktion zu optimieren oder die Spezialisten die das meiste aus deinen Einwohnern heraus holen. Du kannst außerdem nach Items suchen, die den Erfolg für deine Expeditionen erhöhen.",
    about:
      "Anno 1800 toolkit wird von einigen Anno Fans entwickelt, die die Suche nach den passenden Items vereinfachen wollten. Wenn du einen Fehler gefunden hast oder eine neue Funktion vorschlagen möchtest, kannst du <0>hier</0> ein Ticket eröffnen. Diese Anwendung ist unter der <1>MIT Lizenz</1> lizenziert.",
  },
  ...getTranslations("german"),
};
