const { merge } = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(option => {
        option = merge(option, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'ant-design-vue',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return option
      })
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      postcss: {
        plugins: [
          // require('postcss-pxtorem')({
          //   rootValue: 37.5, // vant官方使用的是37.5
          //   selectorBlackList: ['vant', 'mu'], // 忽略转换正则匹配项
          //   propList: ['*']
          // })
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          })
        ]
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mock.hmilyld.com/mock/61809537d588950021972d1b/api/',
        // target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/api',
          '^/api': '/'
        }
      }
    }
  }
}
