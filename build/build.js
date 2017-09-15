require('./check-versions')()
const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = NODE_ENV === 'production'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var exec = require('child_process').exec
var spinner = ora('building for '+ NODE_ENV +'...')
spinner.start()

var buildStyleScript = require('../package.json').scripts['theme']
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  exec(buildStyleScript, function (err){
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
})
