// @ts-check

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['build', '*.config.{mjs,js}'],
  },
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.tsx'],
    ...pluginReactConfig,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // {
  //   files: ['**/*.@(ts|tsx)'],
  //   languageOptions: {
  //     parser: tseslint.parser,
  //     parserOptions: {
  //       project: './tsconfig.json',
  //     },
  //   },
  // },
);
