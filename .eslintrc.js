module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@vue/prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  env: { node: true },
}
