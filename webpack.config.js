const path = require('path');

module.exports = {
	entry: './lib/index.js',
	devtool: 'source-map',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname),
		library: 'paginator',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ["@babel/plugin-transform-runtime"]
					}
				}
			},
			{
				test: /(\.scss)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	}
};