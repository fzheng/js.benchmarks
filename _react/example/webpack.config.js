'use strict';

const webpack = require("webpack");

const PROD = JSON.parse(process.env.PROD_DEV || "0");

module.exports = {
  context: __dirname + "/static",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          compact: false,
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.jsx$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]: []
};
