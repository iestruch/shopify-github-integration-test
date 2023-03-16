const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
} = require('glob')
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";
const devtool = mode === "development" ? "eval-cheap-source-map" : false;
const stats = mode === "development" ? "errors-warnings" : { children: false };
const sass = require("node-sass");

module.exports = {
  mode: mode,
  devtool: devtool,
  output: {
    path: path.resolve(__dirname, '.tmp')
  },
  entry: globSync('./src/**/*.js').reduce((acc, path) => {
    const entry = (/src\/([^\/]+)\/.*/).exec(path)[1];
    acc[entry] = `./${path}`;
    return acc;
  }, {}),
  plugins: [
    new MiniCssExtractPlugin({
      filename: () => {
        if (mode === 'development') {
          return '../assets/[name].custom.css';
        }
        
        return './assets/[name].custom.css';
      }
    }),
  ],
  stats: stats,
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};

if (mode === "development") {
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["echo Webpack build in progress...🛠"],
      },
      onBuildEnd: {
        scripts: ["echo Build Complete 📦"],
        parallel: true,
      },
    })
  );
}
