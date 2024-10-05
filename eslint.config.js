import js from '@eslint/js'
import muiPathImports from 'eslint-plugin-mui-path-imports'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'vite.config.ts']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      'mui-path-imports': muiPathImports
    },
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
      "no-restricted-imports": [
        "error",
        {
          // "patterns": ["@mui/*/*/*"]
        }
      ],
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      'mui-path-imports/mui-path-imports': 'error',
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },
)