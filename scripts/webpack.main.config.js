const path = require('path')
const rules = require('./webpack.rules')

const mainRules = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  }
]

module.exports = {
  entry: {
    index: './src/backend/app.ts',
    preload: './src/backend/preload.ts'
  },
  output: {
    path: path.resolve('.webpack', 'main'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  // Put your normal webpack config below here
  module: {
    rules: rules.concat(mainRules)
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  }
}
