module.exports = function (api) {
  api.cache(false);
  return {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
    "plugins": [
      [
        "@babel/plugin-transform-react-jsx",
        {
          "throwIfNamespace": false,
          "runtime": "classic",
          "pragma": "talon.createElement",
        }
      ]
    ]
  }
};
