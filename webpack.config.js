const path = require('path')

module.exports = {
  entry: {
    bundle: '.src/index.ts',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extension: ['.js', '.ts'],
  },

  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    open: true,
  },

  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
      },
    ],
  },
}