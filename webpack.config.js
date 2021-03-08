let path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  let isDev = argv.mode === "development";
  let isProd = !isDev;

  return {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "./dist/"),
      filename: "main.js",
      publicPath: "dist/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-react-jsx",
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
        },
        {
          test: /\.(png|jpg|svg|gif|webp)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ["file-loader"],
        },
        {
          test: /\.module\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[local]__[sha1:hash:hex:7]",
                },
              },
            },
          ],
        },
        {
          test: /^((?!\.module).)*css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            "css-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "main.css",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: isProd,
        },
      }),
      new CopyWebpackPlugin(
         [
          {
            from: path.resolve(__dirname, "src/favicon.ico"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      ),
    ],
    devServer: {
      historyApiFallback: true,
    },
    devtool: isDev ? "cheap-module-eval-source-map" : false,
  };

  return conf;
};
