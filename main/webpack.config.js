const path = require('path')

function setExternal(name) {
  return function(context, request, callback) {
    if (request === name) {
      return callback(null, 'commonjs ' + request)
    }
    callback()
  }
}

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  entry: './index.ts',
  devtool: 'source-map',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [
    setExternal('@sentry/electron'),
    setExternal('electron-is-dev'),
    setExternal('electron-devtools-installer'),
  ],
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../public'),
  },
}
