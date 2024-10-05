// @ts-nocheck
const js = require('@eslint/js');
const muiPathImports = require('eslint-plugin-mui-path-imports');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = tseslint.config(
  {
    ignores: ['dist', 'vite.config.ts']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      'mui-path-imports': muiPathImports,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      ...tseslint.configs.recommended,
    ],
    rules: {
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
      "react-hooks/exhaustive-deps": 'error'
    },
    overrides: [
      {
        files: ['.eslintrc.{js,cjs}'],
        env: {
          node: true,
        },
        parserOptions: {
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
    ],
  },
);