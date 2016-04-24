/* eslint-disable */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js',
  },

  output: {
    path: path.resolve('./'),
    filename: 'js/[name].js',
    publicPath: path.resolve('./'),
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
          path.resolve('lib'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jade$/,
        include: [
          path.resolve('views'),
          path.resolve('views', 'components'),
        ],
        loader: "jade",
      }
    ],
  },

  plugins: [new HtmlWebpackPlugin({
    title: 'MarsSat',
    filename: 'index.html',
    inject: false,
    template: path.resolve('views', 'index.jade'),
  })],
}
