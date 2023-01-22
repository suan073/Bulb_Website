const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "eval",
  devServer: {
    historyApiFallback: true,
    port: 3200,
    open: true,
    hot: true,
    devMiddleware: {
      publicPath: "/", // 웹팩이 파일을 빌드해서 생성을 해주는 경로 , 가상의 경로 , dev server의 경우에는 메모리에 생성을 해준다
    },
  },

  entry: {
    app: path.join(__dirname, "src/index.tsx"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new RefreshWebpackPlugin(),
  ],
};
