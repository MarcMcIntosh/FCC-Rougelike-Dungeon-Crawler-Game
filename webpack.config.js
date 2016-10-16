const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  target: 'web',
  devtool: 'cheap-source-map',
  devServer: {
    inline: true,
    hot: true,
  },
  output: {
    filename: '[hash].js',
    path: './build',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
  ],
  module: {
    preLoaders: [
      {
        loader: 'eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
};
