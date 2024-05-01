const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'server.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
};
