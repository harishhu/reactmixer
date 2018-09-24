var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'modules');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

compileType = 'h5';

var config = {
  context: ROOT_PATH,
  entry: {
    index: './index.h5.js',
  },
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js'
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'reactmixer',
      filename: 'index.html',
      template: 'src/template/index-template.html',
      chunks: ['commons', 'index']
    }),
    //将被在不同entry中被重复包含的module抽离出来放到commons中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //   name: 'basejs'
  // }),
  // new webpack.optimize.DedupePlugin(),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.NoErrorsPlugin(),
  // new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // progress: true,
  },
  
  module: {
  rules: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader']
    },
    {
       test: /\.scss$/,
       exclude: /node_modules/,
       loaders: ['style-loader', 'css-loader', 'sass-loader']
     },
    {
      test: /\.js$/,
      loader: 'babel-loader',
       include: [APP_PATH]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        // name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        // name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['add-module-exports']
      }
    }
  ]
}
};

module.exports = config;
