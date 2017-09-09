var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ['babel-polyfill',"./js/client.js"],
  devServer: {
    proxy: {
      "/api/**": { target: "http://localhost:3000", bypass: (req, res) => {
          if (req.path === '/') { return '/index.html' }
          },    
        },
      "/ws": {target: "ws://localhost:3001"}
      },
  },
  module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
            }
        },
        {
          test: /\.css?$/,
          loader: ['style-loader', 'css-loader']
        },
        { 
          test: /\.(png|woff|woff2|eot|ttf|svg)?$/,
          loader: 'url-loader?limit=100000'
        }
      ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
