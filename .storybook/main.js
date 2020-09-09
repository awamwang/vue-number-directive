module.exports = {
  stories: [
    '../examples/stories/**/*.stories.mdx',
    '../examples/stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-notes',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource'
  ]
}
