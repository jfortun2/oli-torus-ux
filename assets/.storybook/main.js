const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['./temp'],
  webpackFinal: async (config) => {
    config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()];

    const stylesIncludePath = path.join(__dirname, '../styles');
    const sassLoaderOptions = {
      sassOptions: {
        includePaths: [stylesIncludePath],
        quietDeps: true,
      },
      // Component-level .scss files (e.g. ObjectivesList.scss) use shared mixins from styles/common/
      additionalData: `@import "common/mixins.scss";`,
    };

    config.module.rules = config.module.rules.map((oldRule) => {
      // This injects the sassOptions above into the sass loader so our imports from styles/ work correctly
      if (!oldRule.use) return oldRule;
      return {
        ...oldRule,
        use: (oldRule.use || []).map((oldUse) => {
          if (oldUse.loader && oldUse.loader.indexOf('sass-loader') >= 0) {
            return {
              ...oldUse,
              options: {
                ...oldUse.options,
                ...sassLoaderOptions,
                sassOptions: {
                  ...oldUse.options?.sassOptions,
                  ...sassLoaderOptions.sassOptions,
                },
              },
            };
          }
          return oldUse;
        }),
      };
    });

    // console.info(JSON.stringify(config.module.rules, null, 2));
    return config;
  },
};
