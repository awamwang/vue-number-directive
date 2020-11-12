module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['cypress'],
  extends: [
    '@vue/prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/prettier/@typescript-eslint'
  ],
  env: { node: true, 'cypress/globals': true }
}
