/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // 型情報を使うルールのために必要
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client', 'dist', 'node_modules'],

  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'jsx-a11y',
    'decorator-position', // ← 追加
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],

  rules: {
    // TypeScript の未使用変数チェック
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // デコレータの位置を統一（例: NestJS DTO）
    'decorator-position/decorator-position': [
      'error',
      {
        decoratorsBeforeExport: true,
        properties: 'above',
        methods: 'above',
      },
    ],

    // その他プロジェクト方針に応じて追加
    // 'class-methods-use-this': 'warn',
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    // for jsx-a11y
    formComponents: ['Form'],
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' },
      { name: 'NavLink', linkAttribute: 'to' },
    ],
  },

  overrides: [
    // Node 用の設定ファイル
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
