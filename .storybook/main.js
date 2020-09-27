const path = require('path')
const storiesDir = path.resolve(__dirname, '../examples/stories/')

module.exports = {
  stories: [
    `${storiesDir}/**/*.stories.mdx`,
    `${storiesDir}//**/*.stories.@(js|jsx|ts|tsx)`
  ],
  addons: [
    '@storybook/addon-essentials',
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
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.jsx?$/, /index\.js/],
          include: [storiesDir]
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false }
        }
      }
    }
  ]
}
