/**
 *
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
// when, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES
const { whenDev, when } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const FastRefreshCracoPlugin = require('craco-fast-refresh')
// const CracoVtkPlugin = require('craco-vtk')
const CracoAntDesignPlugin = require('craco-antd')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 缓存用的，第二次打包和构建会极大提升速率
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)
// 判断编译环境是否为生产
const isDocAnalyzer = process.env.REACT_APP_ENV === 'doc'
// 不是开发环境
const isNoDev = process.env.REACT_APP_ENV !== 'development'
// 代理地址
const url = {
  development: 'http://daily.api.beicaizs.com/compliance/',
  test: 'https://b.com/',
  preissue: 'https://c.com/',
  production: 'https://d.com/'
}

const proxyURL = url[process.env.REACT_APP_ENV]
console.log('Brower-env-----------------------', process.env.REACT_APP_ENV)
// 自定义主题
module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('.'),
      src: pathResolve('src'),
      common: pathResolve('src/common')
    },

    plugins: [
      new SimpleProgressWebpackPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      new AntdDayjsWebpackPlugin(),
      new HardSourceWebpackPlugin(),
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: process.env.NODE_ENV === 'production', // 生产环境下移除控制台所有的内容
            drop_debugger: false, // 移除断点
            pure_funcs:
              process.env.NODE_ENV === 'production' ? ['console.log'] : '' // 生产环境下移除console
          }
        }
      }),
      // 新增模块循环依赖检测插件
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
          })
        ],
        []
      ),
      ...when(
        isDocAnalyzer,
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, 'analyzer/index.html')
          })
        ],
        []
      ),
      ...when(
        isNoDev,
        () => [
          new CompressionWebpackPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
            threshold: 1024,
            minRatio: 0.8
          })
        ],
        []
      )
    ],

    // 抽离公用模块
    optimization: {
      splitChunks: {
        chunks: 'async', // async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 20000, // 字节 引入的文件大于200kb才进行分割
        // maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 1, // 模块至少使用次数
        maxAsyncRequests: 30, // 同时加载的模块数量最多是30个，只分割出同时引入的前30个文件
        maxInitialRequests: 30, // 首页加载的时候引入的文件最多30个
        automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
        name: true,
        cacheGroups: {
          vendors: {
            // 自定义打包模块
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 优先级，先打包到哪个组里面，值越大，优先级越高
            filename: 'vendors.js'
          },
          default: {
            // 默认打包模块
            minChunks: 2, // 模块至少使用次数
            priority: -20,
            reuseExistingChunk: true, // 模块嵌套引入时，判断是否复用已经被打包的模块
            filename: 'common.js'
          }
        }
      }
    },

    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, { paths }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist' // 配合输出打包修改文件目录
      // webpackConfig中可以解构出你想要的参数比如mode、devtool、entry等等，更多信息请查看webpackConfig.json文件
      /**
       * 修改 output
       */
      webpackConfig.output = {
        ...webpackConfig.output,
        // ...{
        //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
        //   chunkFilename: 'static/js/[name].js'
        // },
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: '/'
      }

      // 忽略打包
      // webpackConfig.externals = {
      //   'react': 'React',
      //   'react-dom': 'ReactDOM',
      // }

      // 返回重写后的新配置
      return webpackConfig
    }
  },
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
          // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
          // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
          corejs: {
            version: 3, // 使用core-js@3
            proposals: true
          }
        }
      ]
    ],
    // 用来支持装饰器
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: true
        },
        'antd'
      ],
      // 配置解析器
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['babel-plugin-styled-components', { displayName: true }]
    ]
  },
  plugins: [
    // 热更新
    ...whenDev(
      () => [
        {
          plugin: FastRefreshCracoPlugin
        }
      ],
      []
    ),

    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true }
        },
        modifyLessRule() {
          return {
            test: /\.module\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:6]'
                  }
                }
              },
              { loader: 'less-loader' }
            ]
          }
        }
      }
    },
    // antd 主题配置
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          'src/theme/antd.customize.less'
        )
      }
    }
  ],

  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: proxyURL,
        changeOrigin: true,
        secure: false,
        xfwd: false
      }
    }
  }
}
