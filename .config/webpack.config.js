const { globSync } = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const devtool = mode === 'development' ? 'eval-cheap-source-map' : false;
const enabledSourceMap = mode === 'development';
const stats = mode === 'development' ? 'errors-warnings' : { children: false };
const sass = require('node-sass');
const tempDir = path.resolve(__dirname, '../.tmp');

function getSCSSEntryPoints() {
  return globSync('./src/scss/**/*.js').reduce((acc, path) => {
    const entry = /src\/[scss|ts]+\/([^\/]+)\/.*/.exec(path)[1];
    acc[`scss_${entry}`] = `./${path}`;
    return acc;
  }, {});
}

function getTSEntryPoints() {
  return globSync('./src/ts/**/index.ts').reduce((acc, path) => {
    const entry = /src\/[scss|ts]+\/([^\/]+)\/.*/.exec(path)[1];
    acc[`ts_${entry}`] = `./${path}`;
    return acc;
  }, {});
}

function setFileName(pathData) {
  if (!pathData.chunk) {
    return `${srcRelativeDir}/assets/[name].js`;
  }
  const regex = /([^_]+)_(.*$)/.exec(pathData.chunk.name);
  const type = regex[1];
  const name = regex[2];
  if (type === 'scss') {
    return `assets/[name].js`;
  } else if (type === 'ts') {
    return `../assets/${name}.bundle.js`;
  }
}

function setSCSSFile(pathData) {
  if (!pathData.chunk) {
    return `../assets/[name].custom.css`;
  }
  const regex = /[^_]+_(.*$)/.exec(pathData.chunk.name);
  const name = regex[1];
  return `../assets/${name}.custom.css`;
}

const entryPoints = {
  ...getSCSSEntryPoints(),
  ...getTSEntryPoints(),
};

module.exports = {
  mode: mode,
  devtool: 'inline-source-map',
  output: {
    path: tempDir,
    filename: setFileName,
  },
  entry: entryPoints,
  plugins: [
    new MiniCssExtractPlugin({
      filename: setSCSSFile,
    }),
  ],
  stats: stats,
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // look for .ts files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader', // use ts-loader to transpile TypeScript to JavaScript
        },
      },
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
                plugins: [['autoprefixer', { grid: true }], 'postcss-minify'],
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

if (mode === 'development') {
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo Webpack build in progress...🛠'],
      },
      onBuildEnd: {
        scripts: ['echo Build Complete 📦'],
        parallel: true,
      },
    }),
  );
}
