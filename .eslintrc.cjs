module.exports = {
  env: {
    node: true,
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
