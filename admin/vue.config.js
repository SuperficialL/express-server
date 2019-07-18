const path = require('path')

module.exports = {
  // eslint-loader是否在保存时检查
  lintOnSave: true,
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: '../backend/dist',
  assetsDir: 'static',
  // webpack-dev-server 相关配置
  devServer: {
    // open: true,
    overlay: {
      warning: true,
      errors: true
    },
    // 设置代理
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8000/',
    //     // 是否允许跨域
    //     changeOrigin: true
    //   }
    // }
  },
  // webpack 配置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('static', path.resolve(__dirname, 'static'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('api', path.resolve(__dirname, 'src/api'))
  }
}
