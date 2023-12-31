var path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: `./src/app.ts`,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "dist",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
    ],
  },
};
