// This file exists for the docs generation

var path = require('path');
var autoprefixer = require('autoprefixer');
var gulpConfig = require('./gulp/config');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'eval',
	context: __dirname,
	entry: [
		'./src/docs/index.html',
		'./src/docs/index.jsx',
	],
	output: {
		path: path.join(__dirname, '/dist/docs'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: 'dist/docs'
	},
	postcss: function() {
		return [
			autoprefixer({
				browsers: gulpConfig.AUTOPREFIXER_BROWSERS
			})
		];
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'file?name=index.html',
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules)/,
			},
			{
				test: /\.less$/,
				loaders: ['style', 'css?sourceMap', 'postcss', 'less?sourceMap'],
			},
			{
				test: /\.json/,
				loader: 'json',
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		// Move static images over as well. This isn't normally something you do
		// with webpack but it works fine for our case.
		new CopyWebpackPlugin([
			{ from: './src/docs/img', to: 'img' }
		])
	]
};
