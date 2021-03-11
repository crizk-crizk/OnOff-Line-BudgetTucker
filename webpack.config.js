const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  // Update the entry point
  entry: "./public/index.js",
  output: {
    // Set the path and filename for the output bundle (hint: You will need to use "__dirname")
    path: __dirname + "/public/dist",
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: "My Progressive Budget Web App",
      short_name: "MyPWA",
      description: "My awesome Budget Web App!",
      background_color: "#ffffff",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
    }),
  ],
};

module.exports = config;
