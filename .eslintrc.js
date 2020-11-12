module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['cypress'],
  extends: [
    '@vue/prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/prettier/@typescript-eslint'
  ],
  env: { node: true, 'cypress/globals': true }
}
