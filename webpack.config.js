var path = require('path')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};