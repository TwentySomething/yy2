var Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './src/index.js')
  .enableReactPreset()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();