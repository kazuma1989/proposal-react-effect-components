const path = require('path')

module.exports = (env, argv) => {
  const production = argv.mode === 'production'

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
    },
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    stats: 'minimal',

    devServer: {
      port: 9000,
      contentBase: path.resolve(__dirname, './dist'),
    },
  }
}
