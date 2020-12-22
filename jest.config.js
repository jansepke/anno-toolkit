/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: {
        jsx: "react",
      },
    },
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};
