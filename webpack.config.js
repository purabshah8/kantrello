const path = require("path");
const webpack = require("webpack");

var plugins = [];
var devPlugins = [];

var prodPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
];

plugins = plugins.concat(
  process.env.NODE_ENV === "production" ? prodPlugins : devPlugins
);

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  context: __dirname,
  entry: "./frontend/kantrello.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "builds"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    minimize: false,
  },
  devtool: false,
};
