const path = require('path')

module.exports = {
  stories: [
    '../examples/stories/element/**/*.stories.mdx',
    '../examples/stories/element/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-storysource',
      // options: {
      //   rule: {
      //     test: [/\.stories\.jsx?$/],
      //     include: [path.resolve(__dirname, '../examples/stories/')]
      //   },
      //   loaderOptions: {
      //     prettierConfig: { printWidth: 80, singleQuote: false }
      //   }
      // }
    }
  ]
}
