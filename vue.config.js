// vue.config.js
module.exports = {
  // 打包的根路径 使用的是相对
  publicPath: './',
  // 不要map文件 记录打包的信息
  productionSourceMap: false,
  // 意思是 和webpack的设置合并
  configureWebpack: {
    // 不要打包的文件
    externals: {
      // 左侧是 模块的名字
      // 右边的是 模块主动暴露出来的名字
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      // 自己主动暴露的名字是 ELEMENT
      'element-ui': 'ELEMENT'
    }
  }
}
