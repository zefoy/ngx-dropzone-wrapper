var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'main': './src/main.ts',
    'polyfills': './src/polyfills.ts'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {
    	  test: /\.ts$/,
    	  loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				]
    	},
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    modules: [ '../src', path.join(__dirname, "../node_modules") ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new CopyWebpackPlugin([{
      context: './public',
      from: '**/*',
      to: './dist'
    }])
  ]
};
