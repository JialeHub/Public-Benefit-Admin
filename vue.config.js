const settings = require("./src/settings");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const resolve = dir => require("path").join(__dirname, dir);
const isOpenGzip = false; // 开启gzip压缩, 按需引用
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  publicPath: NODE_ENV === "production" && settings.isHistory ? "/" : "./", // (/绝对路径) (./相对路径)
  outputDir: "dist", // 生产环境构建文件的目录
  assetsDir: "static", // 放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录
  indexPath: "index.html", // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  lintOnSave: false, // eslint是否在保存的时候检查
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。
  transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件，可设置为 false 以加速生产环境构建。
  crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (NODE_ENV === "production" && isOpenGzip) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: true // 删除源文件
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },

  // 配置快捷路径，styles为路径名字，resolve是原路径地址
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复HMR
    config.resolve.alias.set("@", resolve("src"));
    // 配置svg
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    sourceMap: false, // 开启 CSS source maps? 设置为 true 之后可能会影响构建的性能。
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/index.scss";'
      }
    }
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1,
  // 反向代理
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        // 目标:指向网络地址
        target: "http://31p08u0222.oicp.vip/",
        // webpack属性，映射一个host
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // 传递任何第三方插件
  pluginOptions: {
    // ...
  }
};
