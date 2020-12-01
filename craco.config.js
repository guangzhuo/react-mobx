

/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const {
  when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES
} = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const CracoVtkPlugin = require('craco-vtk')
const CracoAntDesignPlugin = require('craco-antd')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const webpack = require('webpack')
// const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
// const CracoAliasPlugin = require('craco-alias')
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
const CircularDependencyPlugin = require('circular-dependency-plugin')
// const WebpackBar = require('webpackbar')
// const CracoAntPlugin = require('craco-antd')
// const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
// 自定义主题
module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('.'),
      src: pathResolve('src'),
    },
    
    plugins: [

      // webpack构建进度条
      // new WebpackBar({
      //   profile: true
      // }),
      new SimpleProgressWebpackPlugin(),

      // // 新增模块循环依赖检测插件
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
          }),
          // webpack-dev-server 强化插件
          // new DashboardPlugin(),
          // new webpack.HotModuleReplacementPlugin()
        ], []
      ),

      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 1024,
        minRatio: 0.8
      }),

      
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    
    //抽离公用模块
    optimization: {
      splitChunks: {
        chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 3000,         //字节 引入的文件大于30kb才进行分割
        //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 1,           //模块至少使用次数
        maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
        automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
        name: true,
        cacheGroups: {
          vendors: {  //自定义打包模块
            test: /[\\/]node_modules[\\/]/,
            priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
            filename: 'vendors.js',
          },
          default: { //默认打包模块
            priority: -20,
            reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
            filename: 'common.js'
          }
        }
      },
      UglifyJsPlugin: {
        // 删除注释
        output: {
          comments: false
        },
        // 删除console debugger 删除警告
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,//不打印log
        },
      }
    },
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, {
      env, paths
    }) => {
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
        /**
         * webpack split chunks
         */
        // webpackConfig.optimization.splitChunks = {
        //   ...webpackConfig.optimization.splitChunks,
        //   ...{
        //     chunks: 'all',
        //     name: true
        //   }
        // }
        // 返回重写后的新配置
      return webpackConfig
    },

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
            proposals: true,
          },
        },
      ],
    ],
    //用来支持装饰器
    plugins: [
      ['import', { 
        libraryName: 'antd', 
        libraryDirectory: 'es', 
        style: true 
        }, 'antd'],
      // 配置解析器
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["babel-plugin-styled-components", { "displayName": true }]
    ]
  },
  plugins: [
    // 热更新
    ...whenDev(
      () => [{
        plugin: CracoVtkPlugin()
      }], []
    ),

    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true },
        },
        modifyLessRule: function() {
          return {
            test: /\.module\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:6]',
                  },
                },
              },
              { loader: 'less-loader' },
            ],
          };
        },
      },
    },
    // antd 主题配置
    {
      plugin: CracoAntDesignPlugin,
      options: {
      customizeThemeLessPath: path.join(__dirname,"src/theme/antd.customize.less")}
     },
   
    // 别名
    // {
    //   plugin: CracoAliasPlugin,
    //   options: {
    //     source: "options",
    //     baseUrl: "./",
    //     aliases: {
    //       '@': './src'
    //     }
    //   }
    // },
  ]
};