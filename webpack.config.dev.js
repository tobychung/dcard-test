const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackStrip = require("strip-loader");
const autoprefixer = require("autoprefixer");
const JxsLoader = ["babel?presets[]=es2015&presets[]=react&presets[]=stage-1"];
const bower_dir = __dirname + '/bower_components';

const extractSass = new ExtractTextPlugin({
  filename: "static/[name].bundle.css"
});

var config = {
  mode: "development",
  devtool: 'cheap-eval-source-map',
  entry: [
    "babel-polyfill",
    path.join(__dirname, "app/main.js")
  ],
  output: {
    path: __dirname + '/build',
    filename: "index_bundle.js",
    chunkFilename: 'vendor_[name]_bundle.js',
    publicPath: "/",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      template: __dirname + "/build/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],

  module: {
    noParse: [bower_dir + '/react/react.production.min.js'],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-0", "react-hmre"],
        },
      }, {
        test: /\.(scss|css)$/,
        loader: 'style!css!sass'
        // loader: "style!css!postcss!sass"

      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: JxsLoader,
      }, {
        test: /\.json?$/,
        loader: "json-loader",
      }, {
        test: /\.(ico|eot|woff|woff2|ttf|svg|png|jpg|gif)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: "url-loader?limit=3000",
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    runtimeChunk: true
  }
};


module.exports = config;