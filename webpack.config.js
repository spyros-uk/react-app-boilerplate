var path = require("path")
var webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const args = (() => {
  return process.argv.slice(2).reduce((args, arg) => {
    const [key, value] = arg.replace("--", "").split("=")
    return { ...args, [key]: value }
  }, {})
})()
const MODES = {
  DEV: "development",
  PROD: "production"
}
const commonConfig = {
  context: path.join(__dirname, "src"),
  entry: ["./index.js"],
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
  }
}
const prodConfig = {
  mode: MODES.PROD,
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js",
    publicPath: "./"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(MODES.PROD)
      }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  performance: {
    hints: "warning"
  }
}
const devConfig = {
  mode: MODES.DEV,
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js",
    publicPath: "./"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "www"),
    hot: true,
    port: 9000
  }
}
const config = (mode => {
  switch (mode) {
    case MODES.PROD:
      return { ...commonConfig, ...prodConfig }
    case MODES.DEV:
      return { ...commonConfig, ...devConfig }
    default:
      return { ...commonConfig, ...prodConfig }
  }
})(args.mode)

module.exports = config
