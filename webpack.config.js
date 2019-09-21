const path = require('path');

module.exports = {
  entry: './src/cognito/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'laconia-cognito-adapter.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    // libraryExport: 'default',
    library: 'laconia-cognito-adapter'
  },
  mode: 'production',
  target: 'node',
  optimization: {
    minimize: true
  },
  performance: {
    hints: 'warning'
  },
  // externals: {
  //   lodash: {
  //     commonjs: 'lodash',
  //     commonjs2: 'lodash',
  //     amd: 'lodash',
  //     root: '_'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: [/node_modules/]
      }
    ]
  }
};
