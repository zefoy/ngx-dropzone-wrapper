var path = require('path');
var webpack = require('webpack');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var webpackRxjsExternals = require( 'webpack-rxjs-externals');
var webpackAngularExternals = require( 'webpack-angular-externals');

module.exports = {
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false
  },
  entry: {
    'ngx-dropzone-wrapper.umd': './src/index.ts',
    'ngx-dropzone-wrapper.umd.min': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, '../bundles'),
    filename: '[name].js',
    library: 'ngx-dropzone-wrapper',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'src/tsconfig.json',
              declaration: 'false'
            }
          },
          {
            loader: 'angular-inliner-loader',
            options: {
              styleSuffix: "scss"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.(html|css)$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts' ],
    modules: [ path.join(__dirname, '../node_modules') ]
  },
  plugins: [
    new UglifyJSPlugin({
      include: /\.min\.js$/
    })
  ],
  externals: [
    webpackRxjsExternals(),
    webpackAngularExternals()
  ]
};
