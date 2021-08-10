const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rendererRules = [
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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
  devtool: 'nosources-source-map'
}
