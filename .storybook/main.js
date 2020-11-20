const path = require('path')
const storiesDir = path.resolve(__dirname, '../examples/stories/')

module.exports = {
  stories: [
    `../examples/stories/**/*.stories.mdx`,
    `../examples/stories/**/*.stories.@(js|jsx|ts|tsx)`,
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': storiesDir,
          },
        },
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../examples/stories/')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
}
