module.exports = {
    // other configurations...
    module: {
      rules: [
        // your other rules...
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/@chainsafe\/is-ip\/lib/,
            /node_modules\/dag-jose\/lib/,
          ],
        },
      ],
    },
  };