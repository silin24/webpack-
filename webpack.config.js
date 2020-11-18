const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = {
  // 模式: 生产环境
  // mode: "production",
  //入口
  entry: "./src/index.js",
  //出口
  output: {
    path: resolve("dist"),
    filename: "static/js/[name].bundle.js",
  },
  //模块打包器
  module: {
    rules: [
      //配置loader
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/, //处理js文件
        // exclude: /(node_modules|bower_components)/, //排除匹配的文件夹
        include: [resolve("src")], //只对匹配的文件夹处理
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //处理css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // 多个loader从右到左处理
      },
      //处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          name: "static/img/[name].[hash:7].[ext]", // 相对于output.path
        },
      },
    ],
  },
  //插件
  plugins: [
    //插件实例对象
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  devServer: {
    port: 8081,
    open: true,
    quiet: true,
  },
  // 开启source-map调试
  devtool: "cheap-module-eval-source-map",
  // 模块引入解析
  resolve: {
    extensions: [".js", ".vue"],
  },
};
