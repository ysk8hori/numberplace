module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react',
  options: {
    postcssLoaderOptions: {
      implementation: require('postcss'),
    },
  },
};
