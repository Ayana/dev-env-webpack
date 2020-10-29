const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: 'development', // Minify js
	watch: true,
	entry: './src/js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
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
			filename: '[name].css',
			chunkFilename: '[id].css',
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
					'style-loader', // 3. Inject styles into DOM
					'css-loader', // 2. Turns css into commonjs
					'sass-loader', // 1. Turns sass into css
				],
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
						},
					},
				],
			},
		],
	},
}
