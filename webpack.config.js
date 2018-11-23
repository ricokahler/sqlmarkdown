const path = require('path');
const resolveToUndefined = path.resolve(__dirname, './src/undefinedPlaceholder');

module.exports = {
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  entry: path.resolve(__dirname, './src/web.tsx'),
  output: {
    path: path.resolve('.'),
    filename: 'sql-md.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'awesome-typescript-loader' }],
      },
      {
        test: /\.css/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { minimize: true } }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    alias: {
      fs: resolveToUndefined,
    },
  },
  externals: {
    sqlMarkdown: 'sqlMarkdown',
  },
};
