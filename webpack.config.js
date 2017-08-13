let path = require('path')

let webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: './example/browser.js',
  output: {
    publicPath: '/example/',
    path: path.join(__dirname, './example'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
