// vue.config.js
const chunkPrefix = '[name].min';

module.exports = {

  outputDir: 'dist/',
  publicPath: 'resources/js/plugins/app',
  pages: {
    af702: {
      entry: 'src/main.js'
    }
  },

  css: {
    extract: {
      filename: `${chunkPrefix}.css`,
      chunkFilename: `${chunkPrefix}.css`
    }
  },
  // https://stackoverflow.com/questions/61122635/vue-js-exclude-folders-from-webpack-bundle (May 13 2021)
  chainWebpack: (config) => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('img/**');
      options[0].ignore.push('src/assets/**');
      options[0].ignore.push('resources/**');
      options[0].ignore.push('*.html');
      return [options];
    });
  },
  configureWebpack: {
    output: {
      filename: `${chunkPrefix}.js`,
      chunkFilename: `${chunkPrefix}.js`
    }
  }
};
