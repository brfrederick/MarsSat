/* eslint-disable */
var path = require('path');

module.exports = {
  entry: {
    app: './src/main.js',
  },

  output: {
    path: path.resolve('build'),
    filename: 'js/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
