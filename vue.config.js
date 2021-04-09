module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        api: require('path').resolve(__dirname, 'src/api'),
        components: require('path').resolve(__dirname, 'src/components'),
        composables: require('path').resolve(__dirname, 'src/composables'),
        constants: require('path').resolve(__dirname, 'src/constants'),
        hooks: require('path').resolve(__dirname, 'src/hooks'),
        router: require('path').resolve(__dirname, 'src/router'),
        store: require('path').resolve(__dirname, 'src/store'),
        utils: require('path').resolve(__dirname, 'src/utils'),
        views: require('path').resolve(__dirname, 'src/views'),
        helpers: require('path').resolve(__dirname, 'src/helpers'),
      },
    },
  },
}
