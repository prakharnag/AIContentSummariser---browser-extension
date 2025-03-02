const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/background.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'background.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
};