const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "client/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/,}],
  },
  mode:"production",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client/pub/index.html"),
    }),
  ],
};