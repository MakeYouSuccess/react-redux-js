const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    // 'webpack-hot-middleware/client?http://localhost:8080/',
    './dist/main.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js',
    chunkFilename: '[id].bundle.js',
    library: 'app/bundle',
    libraryTarget: 'amd',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  /* module: {
    loaders: [{
      test: /\.js&/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
    }],
  },*/
};
