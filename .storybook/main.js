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
    '@storybook/addon-storysource'
  ]
}
