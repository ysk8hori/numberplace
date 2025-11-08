module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/preset-scss', {
    name: '@storybook/addon-styling',
    options: {
      postCss: {
        implementation: require('postcss'),
      },
    },
  }, '@storybook/addon-webpack5-compiler-swc', '@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  webpackFinal: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['postcss-loader'],
    });
    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
