const path = require('path')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rendererRules = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        getCustomTransformers: path.join(
          __dirname,
          './webpack.ts-transformers.js'
        )
      }
    }
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: 'css-loader' },
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  },
  {
    test: /\.(ico|icns)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]'
    }
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader']
  },
  {
    test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]'
    }
  }
]

const rendererPlugins = [new MiniCssExtractPlugin()]

module.exports = {
  module: {
    rules: rules.concat(rendererRules)
  },
  plugins: plugins.concat(rendererPlugins),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    plugins: [new TsconfigPathsPlugin({})]
  },
  devtool: 'source-map'
}
