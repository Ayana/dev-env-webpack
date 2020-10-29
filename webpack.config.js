const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development', // Minify js
	context: path.resolve(__dirname),
	// watch: true, // For production build
	entry: './src/js/app.js',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true,
		open: true,
		port: 9000,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new HtmlWebPackPlugin({
			template: './src/fade.html',
			filename: 'fade.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader, // 3. Inject styles into DOM
					'css-loader', // 2. Turns css into commonjs
					'sass-loader', // 1. Turns sass into css
				],
				// use: [
				// 	'style-loader', // 3. Inject styles into DOM
				// 	'css-loader', // 2. Turns css into commonjs
				// 	'sass-loader', // 1. Turns sass into css
				// ],
			},
			{
				test: /\.html$/i,
				use: ['html-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash].[ext]',
							outputPath: 'images',
							esModule: false,
							// publicPath: '../', // when need to customize path
							// useRelativePaths: true,
						},
					},
				],
			},
		],
	},
}
