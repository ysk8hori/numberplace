const react = require('@vitejs/plugin-react');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react-vite', // OR whatever framework you're using
  features: {
    storyStoreV7: true,
  },
  docs: {
    docsPage: 'automatic',
    autodocs: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...config.define,
        global: 'window',
      },
      build: {
        ...config.build,
        rollupOptions: {
          external: ['@storybook/window', '@testing-library/jest-dom'],
        },
      },
    };
  },
};
