const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const args = getArgs()

const SETTINGS = {
  PROD_PATH: path.join(__dirname, "www"),
  DEV_PATH: path.join(__dirname, "src"),
  MODE: args.mode || "production",
  DEV_TOOL: this.MODE === "development" ? "source-maps" : false
}

module.exports = {
  mode: SETTINGS.MODE,
  devtool: SETTINGS.DEV_TOOL,
  context: SETTINGS.DEV_PATH,
  entry: ["./index.js"],
  output: {
    path: SETTINGS.PROD_PATH,
    filename: "bundle.js"
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  performance: {
    hints: "warning"
  },
  devServer: {
    port: 9000
  }
}

function getArgs() {
  return process.argv.slice(2).reduce((args, arg) => {
    const [key, value] = arg.replace("--", "").split("=")
    return { ...args, [key]: value }
  }, {})
}
