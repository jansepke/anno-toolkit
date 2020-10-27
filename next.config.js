const withOptimizedImages = require("next-optimized-images");

const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {};

module.exports = withOptimizedImages({
  responsive: {
    adapter: require("responsive-loader/sharp"),
    esModule: true,
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
});
