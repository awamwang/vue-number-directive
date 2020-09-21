module.exports = {
  stories: [
    '../examples/stories/**/*.stories.mdx',
    '../examples/stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-knobs'
  ]
}
