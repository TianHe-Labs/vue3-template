module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {},
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // "prettier:recommended", // eslint-config-prettier
    'plugin:prettier/recommended', // eslint-plugin-prettier
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 'off',
    indent: 'off', // 关闭默认防止冲突，如 switch/case
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // un-ban a type that's banned by default
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
  // "noInlineConfig": true,
  reportUnusedDisableDirectives: true,
}
