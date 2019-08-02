const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /ffmpeg/,
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/, /ffmpeg/],
      use: [
        'babel-loader',
      ],
    }
    ]
  }
};
