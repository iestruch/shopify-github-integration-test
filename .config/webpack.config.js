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
const enabledSourceMap = mode === 'development';
const stats = mode === "development" ? "errors-warnings" : { children: false };
const sass = require("node-sass");
const tempDir = path.resolve(__dirname, '../.tmp');
const srcRelativeDir = '../';

module.exports = {
  mode: mode,
  devtool: devtool,
  output: {
    path: tempDir
  },
  entry: globSync('./src/**/*.js').reduce((acc, path) => {
    const entry = (/src\/([^\/]+)\/.*/).exec(path)[1];
    acc[entry] = `./${path}`;
    return acc;
  }, {}),
  plugins: [
    new MiniCssExtractPlugin({
      filename: () => {
          return `${srcRelativeDir}/assets/[name].custom.css`;
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
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }],
                  'postcss-minify'
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
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
