module.exports = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ],
      "@babel/preset-typescript"
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "babel-plugin-transform-import-meta",
      "babel-plugin-transform-vite-meta-env",
     ],
};