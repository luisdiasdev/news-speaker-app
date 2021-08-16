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
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/backend/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: rules.concat(mainRules)
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  }
}
