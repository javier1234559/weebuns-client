// @ts-nocheck
const js = require('@eslint/js');
const muiPathImports = require('eslint-plugin-mui-path-imports');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const globals = require('globals');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const react = require('eslint-plugin-react');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['dist', 'vite.config.ts']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': eslintPluginPrettier,
      'mui-path-imports': muiPathImports,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    extends: [
      "prettier",
    ],
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      'no-restricted-imports': ['error', {}],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      'mui-path-imports/mui-path-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^\\u0000"],
            ["^(@/pages)(/.*|$)"],
            [
              "^(@/components/layouts)(/.*|$)",
              "^(@/components/common)(/.*|$)",
              "^(@/components)(/.*|$)",
            ],
            ["^(@)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.(css)$", "^.+\\.(scss)$"],
          ],
        },
      ],
      'import/prefer-default-export': 0,
      'react/require-default-props': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-unescaped-entities': 0,
      'react/jsx-props-no-spreading': 0,
      'jsx-a11y/label-has-associated-control': 0,
    },
  },
  {
    files: ['.eslintrc.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
    },
  },
  {
    files: ['./src/components/ui/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/jsx-props-no-spreading': 0,
      'react/prop-types': 0,
      'no-use-before-define': 0,
      'react/jsx-no-constructed-context-values': 0,
    },
  },
  {
    files: [
      './src/components/common/**/*.{js,jsx,ts,tsx}',
      './src/components/forms/**/*.{js,jsx,ts,tsx}',
      './src/components/modals/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'react/jsx-props-no-spreading': 0,
    },
  },

];