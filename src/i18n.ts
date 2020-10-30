import NextI18Next from "next-i18next";
import path from "path";

export default new NextI18Next({
  defaultLanguage: "de",
  otherLanguages: ["de", "en"],
  localePath: path.resolve("./data/locales"),
});
