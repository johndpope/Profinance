module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      util: require.resolve("util/")
    }
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpeg|png|jpg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: './public/assets/[name].[ext]',
          publicPath: './public/images/'
        }
      },
      {
        test:/\.html$/,
        use: [
          'html-loader'
        ]
      }
    ]
  }
}