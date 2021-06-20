const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  webpack5: false,
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
