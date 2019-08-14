const path = require('path')
const webpack = require('webpack')

function setExternal(name) {
  return (context, request, callback) => {
    if (request === name) {
      return callback(null, 'commonjs ' + request)
    }
    callback()
  }
}

module.exports = {
  context: path.resolve(__dirname),
  devtool: 'source-map',
  entry: './index.ts',
  externals: [
    setExternal('@sentry/electron'),
    setExternal('electron-is-dev'),
    setExternal('electron-devtools-installer'),
  ],
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../public'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'electron-main',
}
