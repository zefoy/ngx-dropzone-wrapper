var path = require('path');
var webpack = require('webpack');
var ngtools = require('@ngtools/webpack');

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
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: '@ngtools/webpack'
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
    }),

    new ngtools.AngularCompilerPlugin({
      entryModule: './src/lib/dropzone.module#DropzoneModule',
      tsConfigPath: './src/tsconfig.json'
    })
  ],
  externals: [
    webpackRxjsExternals(),
    webpackAngularExternals()
  ]
};
