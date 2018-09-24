var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var HtmlWebPackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'production';

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false,
  }
}));

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"production"'
  }
}));

module.exports = config;
