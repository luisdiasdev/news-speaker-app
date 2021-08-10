const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const rendererRules = [
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
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

module.exports = {
  module: {
    rules: rules.concat(rendererRules)
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
}
