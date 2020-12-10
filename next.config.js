const nextTranslate = require("next-translate");

module.exports = nextTranslate({
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
});
