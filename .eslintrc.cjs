module.exports = {
  env: {
    node: true,
  },
  globals: {
    SSRContext: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["solid"],
  extends: [
    "eslint:recommended",
    "plugin:solid/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "warn",
  },
};
