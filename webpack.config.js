const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};