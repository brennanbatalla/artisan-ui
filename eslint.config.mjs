import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['build', 'node_modules', 'tailwind.config.cjs']
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    settings: {
      react: {
        version: '18'
      }
    },

    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: 'off',
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      'no-empty-pattern': 'warn'
    }
  }
];
