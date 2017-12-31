var webpack = require('webpack');
var path = require('path');

var LOCAL_DIR = path.resolve(__dirname, 'src/public');
var SERVER_DIR = path.resolve(__dirname, '../../../../../xampp-5.6.30/htdocs/public');
var APP_DIR = path.resolve(__dirname, 'src/app');

var localBuild = {
  name: "a",
  entry: [APP_DIR + '/index.jsx'],
  output: {
    path: LOCAL_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015','stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  watch: true
};

var serverBuild = {
  name: "b",
  entry: [APP_DIR + '/index.jsx'],
  output: {
    path: SERVER_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015','stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  watch: true
};

module.exports = [
  localBuild,
  serverBuild
];
