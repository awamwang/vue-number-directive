module.exports = {
  root: true,
  plugins: ['import'],
  extends: ['@vue/prettier', 'plugin:vue/essential', 'eslint:recommended'],
  env: { node: true },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    Vue: true,
    VueNumber: true,
  },
}
