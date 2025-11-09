import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/preset-scss',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],

  framework: '@storybook/react-vite',

  docs: {},

  // webpackFinal: config => {
  //   // SCSSファイルの処理順序を修正：sass-loader -> postcss-loader
  //   const scssRule = config.module.rules.find(
  //     rule => rule.test && rule.test.toString().includes('scss'),
  //   );
  //   if (scssRule && Array.isArray(scssRule.use)) {
  //     // postcss-loaderをsass-loaderの後に追加
  //     const postcssLoaderIndex = scssRule.use.findIndex(
  //       loader =>
  //         typeof loader === 'string' && loader.includes('postcss-loader'),
  //     );
  //     if (postcssLoaderIndex === -1) {
  //       scssRule.use.push('postcss-loader');
  //     }
  //   }
  //   return config;
  // },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
