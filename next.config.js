// next.config.js
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  responsive: {
    adapter: require("responsive-loader/sharp"),
    esModule: true,
  },
});
