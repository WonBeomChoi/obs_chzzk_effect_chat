const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: path.resolve(__dirname, 'client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    // app.js를 찾을 때 index.html에 /static을 추가
    // static : Express가 정적 파일을 제공하는 path
    publicPath: '/static',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/pub/index.html'),
    }),
  ],
  watch: true,
};
