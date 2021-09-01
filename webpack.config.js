const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
   entry: "./app/src/js/app.js", // root bundle
   output: {
      filename: "bundle.js", // output bundle
      path: path.resolve(__dirname, "app/dist"), //output absolute path
      clean: true, // clean output folder between builds
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
         },
      ],
   },
   optimization: {
      minimize: true,
      minimizer: [new CssMinimizerWebpackPlugin(), "..."],
   },
   plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
         template: "./app/src/index.html",
         filename: "index.html",
         hash: true,
      }),
      new MiniCssExtractPlugin(),
   ],
   devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
   },
};
