import { ReactLoadablePlugin } from 'react-loadable/webpack';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const client = {
  devtool: 'source',
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: ['react-hot-loader/patch', './client.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{ loader: 'babel-loader',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['env', 'react', 'stage-0'],
          } },
        ],

      },
      {
        test: /\.css$/,
        use: 'style-loader!css-loader!resolve-url-loader',
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!resolve-url-loader!sass-loader',
        }),
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.swf$/, loader: 'url-loader?limit=10000' },

    ],
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

};


const server = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./server.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['env', 'react', 'stage-0'],
          } },
        ],
      },
      {
        test: /\.css$/,
        use: 'style-loader!css-loader!resolve-url-loader',
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.swf$/, loader: 'url-loader?limit=10000' },

    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },

  plugins: [
    new ExtractTextPlugin('style.css'),

  ],

  externals: [nodeExternals()],
  devtool: 'source',
  target: 'node',
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: 'mock',
    __dirname: 'mock',
    setImmediate: true,
  },
};

module.exports = [client, server];
