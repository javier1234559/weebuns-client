module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'simple-import-sort',
    'mui-path-imports',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['warn', {
      singleQuote: true,
      semi: false,
      trailingComma: 'none',
    }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'mui-path-imports/mui-path-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'import/no-extraneous-dependencies': 'off',
    "@typescript-eslint/no-explicit-any": "warn"
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  ],
};
