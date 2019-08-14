const {
  addWebpackPlugin,
  override,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra')
const webpack = require('webpack')

const setWebpackExternalsPlugin = config => {
  const external = function(context, request, callback) {
    if (/^(iconv-lite|feedparser)$/.test(request)) {
      return callback(null, 'commonjs ' + request)
    }
    callback()
  }
  if (config.externals) {
    if (Array.isArray(config.externals)) {
      config.externals.push(external)
    } else {
      config.externals = [config.externals, external]
    }
  } else {
    config.externals = [external]
  }
  return config
}

const setWebpackTargetPlugin = config => {
  config.target = 'electron-renderer'
  return config
}

const setPublicPathPlugin = config => {
  if (config.output) {
    config.output.publicPath = ''
  } else {
    config.output = { publicPath: '' }
  }
  return config
}

const webpackMaker = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#ffa81e', // 全局主色
      '@link-color': '#1890ff', // 链接色
      '@success-color': '#52c41a', // 成功色
      '@warning-color': '#faad14', // 警告色
      '@error-color': '#f5222d', // 错误色
      '@font-size-base': '14px', // 主字号
      '@heading-color': 'rgba(0, 0, 0, .85)', // 标题色
      '@text-color': 'rgba(0, 0, 0, .65)', // 主文本色
      '@text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
      '@disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@border-radius-base': '4px', // 组件/浮层圆角
      '@border-color-base': '#d9d9d9', // 边框色
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // 浮层阴影
    },
  }),
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE),
    })
  ),
  setWebpackExternalsPlugin,
  setWebpackTargetPlugin,
  setPublicPathPlugin
)

module.exports = {
  webpack: webpackMaker,
  jest: function(config) {
    config.runner = '@jest-runner/electron'
    config.testEnvironment = '@jest-runner/electron/environment'
    config.coveragePathIgnorePatterns = [
      '<rootDir>/build/',
      '<rootDir>/main/',
      '<rootDir>/node_modules/',
      '<rootDir>/src/sentry.ts',
      '<rootDir>/src/serviceWorker.ts',
    ]
    return config
  },
}
