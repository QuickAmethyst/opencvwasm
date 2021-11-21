const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const mode = isDev ? 'development' : 'production';
const devtool = isDev ? 'inline-source-map' : undefined;

const developmentConfig = {
  mode,
  entry: {
    index: path.resolve(__dirname, 'src/index.tsx'),
  },
  devtool,
  output: {
    filename: 'static/[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: '/node_modules',
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: 'https://quickamethyst.github.io/opencvwasm/dist/',
      template: 'public/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    open: true,
  },
};

module.exports = developmentConfig;
