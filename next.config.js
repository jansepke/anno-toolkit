const { locales, defaultLocale } = require("./i18n.json");

module.exports = {
  i18n: { locales, defaultLocale },
  async redirects() {
    return [
      {
        source: "/harboroffice",
        destination: "/items/harboroffice",
        permanent: false,
      },
      {
        source: "/guildhouse",
        destination: "/items/guildhouse",
        permanent: false,
      },
      {
        source: "/townhall",
        destination: "/items/townhall",
        permanent: false,
      },
    ];
  },
};
