import antfu from '@antfu/eslint-config';
import solid from 'eslint-plugin-solid/dist/configs/typescript.js';
import * as tsParser from '@typescript-eslint/parser';

export default antfu({
  rules: {
    'style/semi': ['warn', 'always'],
  },
}, {
  files: ['**/*.{ts,tsx}'],
  ...solid,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['tsconfig.json', 'tsconfig.node.json'],
    },
  },
});
