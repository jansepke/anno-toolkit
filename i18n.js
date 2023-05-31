module.exports = {
  locales: ["en", "de"],
  defaultLocale: "de",
  loadLocaleFrom: (lang, ns) => import(`./data/locales/${lang}/${ns}.js`).then((m) => m.default),
  pages: {
    "*": ["common"],
  },
};
