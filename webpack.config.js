const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          "presets": ["@babel/preset-env", "@babel/preset-react"],
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test:/\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test:/\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            },
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ],
  },
  plugins: [  
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true
    }),
  ]
};