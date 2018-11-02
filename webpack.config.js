const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  context: path.join(__dirname, "src"),
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js",
    publicPath: "www"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".js", ".jsx"]
  }
}

module.exports.devServer = {
  contentBase: path.join(__dirname, "./www"),
  compress: true,
  hot: true,
  port: 9000
}

module.exports.devtool = "inline-source-map"
