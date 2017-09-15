require('./check-versions')()
const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('Start building ...')

spinner.start()

const compiler = webpack(webpackConfig)

compiler.watch({}, function (err, stats) {
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
    '  ' + new Date()
  ))
})

