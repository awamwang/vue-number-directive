module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['cypress'],
  extends: ['@vue/prettier', 'eslint:recommended'],
  env: { node: true, 'cypress/globals': true },
}
