const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {

	entry: [
		'./js/main.js',
	],

	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [
							"latest",
							]
						}

				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({fallback :'style-loader',use: 'css-loader'})
			}
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("styles.optimize.css"),
	    new OptimizeCssAssetsPlugin({
	      assetNameRegExp: /\.optimize\.css$/g,
	      cssProcessor: require('cssnano'),
	      cssProcessorOptions: { discardComments: {removeAll: true } },
	      canPrint: true
	    })
	]

};