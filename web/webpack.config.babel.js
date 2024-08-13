const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = () => ({
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    static: Path.join(__dirname, 'build'),
  },
  devtool: false,
  entry: {
    bundle: [
      Path.join(__dirname, 'src/main.jsx'),
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: "[name].js",
          }
        },
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]',
              },
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              titleProp: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: Path.join(__dirname, 'build/generated'),
    publicPath: '/generated/',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: Path.resolve(__dirname, 'src/assets/word-counter-example-file.txt') },
        { from: Path.resolve(__dirname, 'src/assets/wav-example-file.wav') },
      ],
    }),
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      filename: Path.join(__dirname, 'build/index.html'),
      minify: false,
      template: Path.join(__dirname, 'src/assets/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
});
