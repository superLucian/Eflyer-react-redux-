/* eslint-disable max-len, no-var, object-shorthand */

var webpack           = require('webpack');
var path              = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV;
var DEBUG = env !== 'production';
var VERBOSE = process.argv.indexOf('--verbose') > -1;
var apiHost = process.argv.indexOf('--dev') === -1 ?
  (process.env.EFLYER_API_HOST ? process.env.EFLYER_API_HOST : 'http://127.0.0.1:5000')
  : null;
var apiPath = process.env.EFLYER_API_PATH;
var appBaseUrl = process.env.EFLYER_APP_BASE_URL || '/eflyer';

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(env),
  'process.env.BROWSER': true,
  'process.env.API_HOST': JSON.stringify(apiHost),
  'process.env.API_PATH': JSON.stringify(apiPath),
  'process.env.APP_BASE_URL': JSON.stringify(appBaseUrl)
};


// Webpack plugins
var plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    inject: true,
  }),
  new CopyWebpackPlugin([{
    from: 'assets',
    to: '',
    context: path.resolve(__dirname, '../src')
  }]),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'app/[hash].vendor.js',
    minChunks: Infinity,
  }),
];
if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: VERBOSE,
      },
    })
  )
}


module.exports = {

  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
    }
  },
  
  entry: {
    main: (process.argv.indexOf('--dev') === -1 && process.argv.indexOf('--serve') === -1 ?
      // webpack-dev-server
      [
        'babel-polyfill',
        'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://localhost:6001',
        // 'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src')
      ]
      :
      [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '../src')
      ]
    ),
    vendor: [
      'react', 'react-dom', 'jquery', 'moment', 'lodash'
      // 'jquery-ui', 'bootstrap', 'react-bootstrap',
    ]
  },
  
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app/[name].bundle.js',
    sourceMapFilename: 'app/[name].bundle.map',
    chunkFilename: 'app/[id].chunk.js',
    publicPath: appBaseUrl || '/'
  },

  plugins: plugins,
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?' + JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG }),
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?' + JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG }),
          'sass-loader' + (DEBUG ? '?sourceMap' : ''),
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        query:{
          name: 'assets/img/[name].[ext]'
        }
      },
    ]
  },

  performance: {
    hints: false
  },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  cache: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: VERBOSE,
    assets: true,
    errorDetails: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  devServer: {
    host: '127.0.0.1',
    port: 6001,
    inline: true,
    open: true,
    historyApiFallback: true, // respond to 404s with index.html
    hot: true, // enable HMR on the server
  }

};
