const path = require('path')
const storiesDir = path.resolve(__dirname, '../examples/stories/')

module.exports = {
  stories: [
    `../examples/stories/**/*.stories.mdx`,
    `../examples/stories/**/*.stories.@(js|jsx|ts|tsx)`
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': storiesDir
          }
        }
      }
    },
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-storysource',
    // '@storybook/addon-knobs'
  ]
}
