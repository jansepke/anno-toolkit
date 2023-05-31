module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next/core-web-vitals", "prettier"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["**/*.js?(x)"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
