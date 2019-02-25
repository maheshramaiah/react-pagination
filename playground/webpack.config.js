const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './src/index.js',
	target: 'web',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
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
	},
	devServer: {
		contentBase: path.join(__dirname, 'src')
	}
}