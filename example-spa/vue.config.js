const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const EXT_LIB_PATH = require('path').join(__dirname, 'lib') // C:\Users\user\test\vue-crud-x\example-spa
const EXT_ESM_PATH = require('path').join(__dirname, '..', 'example-vite', 'src', 'lib') // C:\Users\user\test\vue-crud-x\example-vite

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    resolve: {
      alias: {
        'ext-lib': EXT_LIB_PATH,
        'ext-esm': EXT_ESM_PATH
      },
      modules: [EXT_LIB_PATH, EXT_ESM_PATH]
    },
    resolveLoader: {
      modules: [EXT_LIB_PATH, EXT_ESM_PATH]
    }
  }
}
